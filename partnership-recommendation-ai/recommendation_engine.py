import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict
import re

class RecommendationEngine:
    def __init__(self, supabase_client):
        self.supabase = supabase_client
        self.vectorizer = None
        self.tfidf_matrix = None
        self.events_df = None
        self.partnerships_df = None
    
    def train_model(self):
        """
        Entraîne le modèle TF-IDF avec les données de Supabase
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
            return
        
        print(f"Loaded {len(self.events_df)} events and {len(self.partnerships_df)} partnerships")
        
        # Créer les documents pour les événements
        self.events_df['document'] = self.events_df.apply(self._create_event_document, axis=1)
        
        # Créer la matrice TF-IDF
        self.vectorizer = TfidfVectorizer(
            max_features=1000,
            stop_words='english',
            ngram_range=(1, 2),  # Unigrammes et bigrammes
            min_df=1,
            max_df=0.8
        )
        
        self.tfidf_matrix = self.vectorizer.fit_transform(self.events_df['document'])
        
        print("Model trained successfully!")
    
    def recommend_events(self, partnership_id: int, top_n: int = 5) -> List[Dict]:
        """
        Recommande des événements pour un partenariat donné
        """
        if self.vectorizer is None or self.tfidf_matrix is None:
            raise Exception("Model not trained. Please train the model first.")
        
        # Récupérer les infos du partenariat
        partnership_response = self.supabase.table('partnerships')\
            .select('*')\
            .eq('id', partnership_id)\
            .execute()
        
        if not partnership_response.data:
            raise Exception(f"Partnership {partnership_id} not found")
        
        partnership = partnership_response.data[0]
        
        # Créer le document du partenariat
        partnership_doc = self._create_partnership_document(partnership)
        
        # Transformer en vecteur TF-IDF
        partnership_vector = self.vectorizer.transform([partnership_doc])
        
        # Calculer la similarité cosinus avec tous les événements
        similarities = cosine_similarity(partnership_vector, self.tfidf_matrix).flatten()
        
        # Obtenir les indices des top N événements
        top_indices = similarities.argsort()[-top_n:][::-1]
        
        # Créer la liste des recommandations
        recommendations = []
        for idx in top_indices:
            event = self.events_df.iloc[idx]
            score = float(similarities[idx])
            
            if score > 0:  # Ne recommander que si score > 0
                recommendation = {
                    'id': int(event['id']),
                    'title': event['title'],
                    'description': event.get('description', ''),
                    'date': str(event.get('date', '')),
                    'location': event.get('location', ''),
                    'type': event.get('type', ''),
                    'matchScore': round(score * 100, 2),
                    'reasons': self._generate_reasons(partnership, event, score)
                }
                recommendations.append(recommendation)
        
        return recommendations
    
    def _create_event_document(self, event: pd.Series) -> str:
        """
        Crée un document texte à partir d'un événement
        """
        parts = []
        
        if pd.notna(event.get('title')):
            parts.append(str(event['title']))
        
        if pd.notna(event.get('type')):
            parts.append(str(event['type']) * 2)  # Poids double pour le type
        
        if pd.notna(event.get('description')):
            parts.append(str(event['description']))
        
        if pd.notna(event.get('location')):
            parts.append(str(event['location']))
        
        document = ' '.join(parts)
        return self._clean_text(document)
    
    def _create_partnership_document(self, partnership: Dict) -> str:
        """
        Crée un document texte à partir d'un partenariat
        """
        parts = []
        
        if partnership.get('title'):
            parts.append(partnership['title'])
        
        if partnership.get('type'):
            parts.append(partnership['type'] * 2)  # Poids double pour le type
        
        if partnership.get('description'):
            parts.append(partnership['description'])
        
        document = ' '.join(parts)
        return self._clean_text(document)
    
    def _clean_text(self, text: str) -> str:
        """
        Nettoie le texte
        """
        # Convertir en minuscules
        text = text.lower()
        
        # Supprimer les caractères spéciaux
        text = re.sub(r'[^a-z0-9\s]', ' ', text)
        
        # Supprimer les espaces multiples
        text = re.sub(r'\s+', ' ', text)
        
        return text.strip()
    
    def _generate_reasons(self, partnership: Dict, event: pd.Series, score: float) -> List[str]:
        """
        Génère les raisons de la recommandation
        """
        reasons = []
        
        # Vérifier le type
        partnership_type = str(partnership.get('type', '')).lower()
        event_type = str(event.get('type', '')).lower()
        
        if partnership_type and event_type:
            if partnership_type in event_type or event_type in partnership_type:
                reasons.append(f"Type correspondant : {event['type']}")
        
        # Score élevé
        if score > 0.7:
            reasons.append("Très forte correspondance sémantique")
        elif score > 0.5:
            reasons.append("Bonne correspondance sémantique")
        elif score > 0.3:
            reasons.append("Correspondance modérée")
        
        # Analyser les mots-clés communs
        partnership_doc = self._create_partnership_document(partnership)
        event_doc = self._create_event_document(event)
        
        partnership_words = set(partnership_doc.split())
        event_words = set(event_doc.split())
        
        common_words = partnership_words.intersection(event_words)
        common_words = [w for w in common_words if len(w) > 3]  # Mots > 3 lettres
        
        if len(common_words) > 3:
            reasons.append(f"{len(common_words)} mots-clés en commun")
        
        # Budget/Valeur du contrat
        contract_value = partnership.get('contract_value', 0)
        if contract_value:
            if contract_value > 50000:
                reasons.append("Budget élevé, événement premium")
            elif contract_value > 10000:
                reasons.append("Budget moyen, bon rapport qualité-prix")
        
        if not reasons:
            reasons.append("Compatibilité détectée par analyse IA")
        
        return reasons[:4]  # Maximum 4 raisons