import pandas as pd
import numpy as np
import re
from typing import List, Dict
from sentence_transformers import SentenceTransformer

class RecommendationEngine:
    def __init__(self, supabase_client):
        self.supabase = supabase_client

        # Modèle de phrases (embeddings sémantiques)
        # all-MiniLM-L6-v2 est léger, rapide et bon pour la similarité
        self.model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

        # Données mises en cache en mémoire après l'entraînement
        self.events_df = None
        self.partnerships_df = None

        # Embeddings des événements (np.ndarray shape [nb_events, dim])
        self.event_embeddings = None

    def train_model(self):
        """
        Charge les données depuis Supabase + prépare les embeddings
        """
        print("Fetching data from Supabase...")

        # Récupérer tous les événements
        events_response = self.supabase.table('events').select('*').execute()
        self.events_df = pd.DataFrame(events_response.data)

        # Récupérer tous les partenariats
        partnerships_response = self.supabase.table('partnerships').select('*').execute()
        self.partnerships_df = pd.DataFrame(partnerships_response.data)

        if self.events_df.empty:
            print("No events found in database")
            self.event_embeddings = None
            return

        print(f"Loaded {len(self.events_df)} events and {len(self.partnerships_df)} partnerships")

        # Construire un "document texte" pour chaque event
        self.events_df["document"] = self.events_df.apply(self._create_event_document, axis=1)

        # Encoder chaque événement en vecteur sémantique
        # -> tableau numpy [nb_events, dim_embedding]
        self.event_embeddings = self.model.encode(
            self.events_df["document"].tolist(),
            convert_to_numpy=True,
            normalize_embeddings=True  # normalisation -> cosinus = produit scalaire
        )

        print("Embeddings generated. Model ready.")

    def recommend_events(self, partnership_id: int, top_n: int = 5) -> List[Dict]:
        """
        Recommande les événements les plus proches sémantiquement
        du partenariat donné
        """
        if self.event_embeddings is None or self.events_df is None:
            raise Exception("Model not trained. Please train the model first.")

        # Récupérer le partenariat demandé
        partnership_response = self.supabase.table('partnerships') \
            .select('*') \
            .eq('id', partnership_id) \
            .execute()

        if not partnership_response.data:
            raise Exception(f"Partnership {partnership_id} not found")

        partnership = partnership_response.data[0]

        # Construire le texte descriptif du partenariat
        partnership_doc = self._create_partnership_document(partnership)

        # Encoder le partenariat en embedding
        partnership_embedding = self.model.encode(
            [partnership_doc],
            convert_to_numpy=True,
            normalize_embeddings=True  # même normalisation
        )[0]  # shape (dim,)

        # Calculer similarité cosinus entre le partenariat et TOUS les events
        # Comme les vecteurs sont normalisés, cos_sim = dot product
        similarities = np.dot(self.event_embeddings, partnership_embedding)  # shape [nb_events]

        # On récupère les indices des top N scores
        top_indices = np.argsort(similarities)[-top_n:][::-1]

        recommendations = []
        for idx in top_indices:
            score = float(similarities[idx])
            if score <= 0:
                # on évite les reco sans aucun sens
                continue

            event = self.events_df.iloc[idx]

            recommendation = {
                "id": int(event["id"]),
                "title": event.get("title", ""),
                "description": event.get("description", ""),
                "date": str(event.get("date", "")),
                "location": event.get("location", ""),
                "type": event.get("type", ""),
                # score de match en %, juste pour l'UI
                "matchScore": round(score * 100, 2),
                "reasons": self._generate_reasons(partnership, event, score),
            }
            recommendations.append(recommendation)

        return recommendations

    # ----------------------
    # Helpers internes
    # ----------------------

    def _create_event_document(self, event: pd.Series) -> str:
        """
        Construit une description textuelle riche d'un événement.
        On concatène titre, type, description, localisation.
        """
        parts = []

        if pd.notna(event.get("title")):
            parts.append(str(event["title"]))

        if pd.notna(event.get("type")):
            # On met deux fois le type pour lui donner plus de poids sémantique
            parts.append(str(event["type"]))
            parts.append(str(event["type"]))

        if pd.notna(event.get("description")):
            parts.append(str(event["description"]))

        if pd.notna(event.get("location")):
            parts.append("Location: " + str(event["location"]))

        raw = " ".join(parts)
        return self._clean_text(raw)

    def _create_partnership_document(self, partnership: Dict) -> str:
        """
        Construit une description textuelle riche d'un partenariat.
        """
        parts = []

        if partnership.get("title"):
            parts.append(str(partnership["title"]))

        if partnership.get("type"):
            parts.append(str(partnership["type"]))
            parts.append(str(partnership["type"]))

        if partnership.get("description"):
            parts.append(str(partnership["description"]))

        # facultatif selon ton schéma : si tu as du secteur, public cible, etc.
        if partnership.get("sector"):
            parts.append("Sector: " + str(partnership["sector"]))

        raw = " ".join(parts)
        return self._clean_text(raw)

    def _clean_text(self, text: str) -> str:
        """
        Nettoyage léger :
        - minuscules
        - retire caractères spéciaux
        - normalise les espaces
        IMPORTANT : on ne retire pas les mots 'inutiles', car le modèle transformer
        comprend déjà le contexte.
        """
        text = text.lower()
        text = re.sub(r"[^a-z0-9\s:]", " ", text)
        text = re.sub(r"\s+", " ", text)
        return text.strip()

    def _generate_reasons(self, partnership: Dict, event: pd.Series, score: float) -> List[str]:
        """
        Génère des raisons lisibles pour la recommandation
        (utile côté front pour expliquer le match)
        """
        reasons = []

        # Raison 1 : type / domaine similaire
        partnership_type = str(partnership.get("type", "")).lower()
        event_type = str(event.get("type", "")).lower()

        if partnership_type and event_type:
            if partnership_type in event_type or event_type in partnership_type:
                reasons.append(f"Type similaire : {event.get('type', '')}")

        # Raison 2 : score sémantique
        if score > 0.7:
            reasons.append("Très forte correspondance sémantique")
        elif score > 0.5:
            reasons.append("Bonne correspondance sémantique")
        elif score > 0.3:
            reasons.append("Correspondance modérée")

        # Raison 3 : mots communs (optionnel, toujours utile en debug humain)
        partnership_doc = self._create_partnership_document(partnership)
        event_doc = self._create_event_document(event)

        partnership_words = set(partnership_doc.split())
        event_words = set(event_doc.split())

        common_words = [w for w in (partnership_words & event_words) if len(w) > 3]

        if len(common_words) > 3:
            reasons.append(f"Mots-clés partagés : {', '.join(list(common_words)[:4])}")

        # Raison 4 : budget indicatif si disponible
        contract_value = partnership.get("contract_value", 0)
        if contract_value:
            if contract_value > 50000:
                reasons.append("Aligné avec un partenariat à gros budget")
            elif contract_value > 10000:
                reasons.append("Bon équilibre coût / valeur potentielle")

        # fallback
        if not reasons:
            reasons.append("Correspondance détectée par similarité sémantique")

        # on limite à 4 raisons max pour l'UI
        return reasons[:4]