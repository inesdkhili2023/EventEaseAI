EventEaseAI – Prédiction intelligente du budget logistique d’un événement
🎯 Objectif du projet

EventEaseAI est une application web de gestion d’événements qui intègre une brique IA pour prédire automatiquement le budget logistique d’un événement (location matériel, transport, services, etc.).

L’application permet :

de gérer les besoins logistiques d’un événement (Spring Boot + PostgreSQL),

de saisir des caractéristiques terrain de l’événement (trafic, météo, foule, etc.),

d’obtenir en temps réel une estimation du budget logistique (en TND) grâce à un modèle de Machine Learning (XGBoost),

et de générer un rapport téléchargeable des résultats.

🧩 Architecture technique

L’architecture est composée de 3 blocs principaux :

1. 🖥 Frontend – Angular

Formulaire de saisie des paramètres d’un événement.

Dashboard “Predict Budget”.

Boutons :

Prédire le Budget → envoie les données à l’API IA.

Charger Données Test → pré-remplit des valeurs de test.

Télécharger le Rapport → exporte un résumé en PDF.

2. ⚙ Backend Métier – Spring Boot

Expose des endpoints REST pour gérer :

les besoins logistiques (logistics_need),

les événements et leurs caractéristiques,

la persistance en base (Supabase/PostgreSQL).

CRUD complet :

Ajouter un “event features”

Modifier

Supprimer

Rechercher / filtrer par ID

Le backend Spring Boot est donc le cœur métier “classique” de l’application.

3. 🤖 Backend IA – Flask

API Python dédiée à l’IA.

Charge le modèle ML entraîné (XGBoost) + le pipeline de preprocessing.

Expose un endpoint /predict qui, à partir des features d’un événement, retourne :

un budget estimé (en TND),

des métadonnées (précision, temps de réponse).

Angular appelle directement l’API Flask pour récupérer la prédiction.

🔬 IA & Modèle de Prédiction
Données

Les données d'entraînement proviennent d’un dataset événementiel (trafic, météo, satisfaction, etc.).
Elles ont été nettoyées et enrichies (feature engineering) dans un notebook Jupyter / Google Colab.

Exemples de features utilisées pour la prédiction :

Total_Duration (durée totale de l’événement en minutes)

Traffic_Level (niveau de trafic)

Crowd_Density (densité de foule)

Satisfaction_Score (retour qualité)

Age (profil du public)

Budget_Category

Weather (ex: Sunny / Rainy / Cloudy)

Optimal_Route_Preference

Gender

Nationality

Travel_Companions (Solo / En groupe / En couple…)

Preferred_Theme (Culturel, Business, Relaxation…)

Preferred_Transport (Walk, Bus, Taxi…)

Modèle

Modèle retenu : XGBoost Regressor

Pourquoi XGBoost ?

Bonne précision (~95%)

Bonne stabilité

Supporte bien les variables numériques et catégorielles (via encodage One-Hot)

Pendant l’entraînement :

Optimisation d’hyperparamètres (GridSearchCV)

Mesures : MAE, RMSE, R²

Comparaison avec d’autres modèles

Export :

model_xgb.pkl → modèle entraîné

preprocessor.pkl → pipeline de preprocessing (scaler + encoders)

Ces artefacts sont chargés au démarrage de l’API Flask.

API /predict

L’API Flask reçoit un JSON du type :

{
  "Total_Duration": 480,
  "Traffic_Level": 1.0,
  "Crowd_Density": 1.1,
  "Satisfaction_Score": 4,
  "Age": 32,
  "Budget_Category": 1.0,
  "Weather": "Sunny",
  "Optimal_Route_Preference": "3->24->27",
  "Gender": "Female",
  "Nationality": "France",
  "Travel_Companions": "Group",
  "Preferred_Theme": "Cultural",
  "Preferred_Transport": "Walk"
}


Elle renvoie :

{
  "prediction_tnd": 1680.66,
  "prediction_level": "Modéré",
  "precision": "95%",
  "response_time_ms": 345
}


Ces valeurs sont ensuite affichées dans l’UI Angular dans une carte de résultat (“Budget Prédit avec Succès !”).

🖼️ Fonctionnalités Front (Angular)

Page Predict Budget (AI)

Saisie manuelle des caractéristiques de l’événement.

Auto-remplissage à partir d’un événement déjà existant en base.

Envoi au modèle IA → réception du budget prédit.

Affichage du résultat :

Budget estimé (TND)

Niveau : Modéré / Élevé …

Précision attendue (ex : 95%)

Temps de réponse (< 1s)

Add Event Features

Formulaire pour créer une nouvelle “fiche événement” avec les features nécessaires.

Sauvegarde côté Spring Boot → Supabase/PostgreSQL.

Event Features List

Liste paginée des événements/instances de features.

Possibilité de filtrer par ID événement.

Actions : modifier / supprimer.

Export du rapport

Génération d’un rapport PDF qui contient le budget prédit et les paramètres qui ont servi à la prédiction.

Utilisé pour archivage ou présentation cliente.

🧠 Valeur ajoutée IA

Passage du “classique CRUD” → à de la prédiction intelligente en temps réel.

Réduction de l’incertitude sur les coûts logistiques avant l’événement.

Temps de réponse quasi instantané (< 1s mesuré).

Visualisation claire pour la prise de décision (tableau des résultats affiché avec couleur, badge “95% précision”, etc.).

🧪 Performance & tests

L’API IA Flask a été testée avec JMeter en charge 100 utilisateurs / 200 utilisateurs :

Temps moyen ~345 ms → ~382 ms

Aucune erreur (0% error rate)

Scalabilité correcte : le throughput double à peu près entre 100 et 200 utilisateurs.

Application Spring Boot testée en local contre PostgreSQL hébergé (Supabase).

Vérification manuelle via Postman :

CRUD Spring Boot (/api/users/logistics, etc.)

/predict Flask

🚀 Démarrage rapide (local)
1. Backend Spring Boot
cd backendIA
mvn spring-boot:run


L’API démarre sur http://localhost:8090

Gère les entités (logistics_need, event_features, etc.)

2. API IA Flask
cd trinta/ml-api
pip install -r requirements.txt
python app.py


L’API démarre sur http://localhost:5001

Endpoint principal : POST /predict

3. Front Angular
cd trinta
npm install
ng serve


L’UI démarre sur http://localhost:4200

Accès à la page de prédiction : /predict-budget

🧑‍💻 Rôles techniques

Data & IA / Intégration modèle :

Nettoyage du dataset

Entraînement XGBoost

Export pickle (model_xgb.pkl, preprocessor.pkl)

Création et déploiement de l’API Flask /predict

Mesure des performances et optimisation

Intégration Front / UX IA :

Création de la page Predict Budget dans Angular

Liaison formulaire → API IA → rendu visuel de la prédiction

Bouton “Charger Données Test”

Génération PDF du rapport de résultat

Backend Métier (Spring Boot) :

Gestion des événements et besoins logistiques

Connexion base Supabase / PostgreSQL

Endpoints CRUD pour alimenter le formulaire de prédiction

📌 Résumé

EventEaseAI permet de :

Saisir les paramètres réels d’un événement,

Prédire le budget logistique automatiquement grâce à l’IA,

Sauvegarder et gérer ces événements côté Spring Boot,

Exporter un rapport pour décision / validation.

👉 C’est une application complète mêlant ingénierie logicielle classique (Spring/Angular) & intelligence artificielle appliquée au métier (Flask + XGBoost).

💙 Project: EventEaseAI
🧑‍💻 Développé dans le cadre de la validation “IA for Software Engineering”
📚 Stack : Angular • Spring Boot • Flask • XGBoost • Supabase/PostgreSQL
