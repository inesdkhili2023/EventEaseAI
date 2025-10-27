EventEaseAI – Application de Prédiction Automatique du Budget Logistique
🎯 Objectif du projet

EventEaseAI est une application web complète qui combine ingénierie logicielle et intelligence artificielle.
Elle permet d’estimer automatiquement le budget logistique d’un événement en fonction de ses caractéristiques (durée, météo, trafic, foule, etc.).

L’idée principale est d’aider les organisateurs à anticiper leurs coûts logistiques avant la mise en œuvre d’un événement.

🧩 Architecture technique

L’application repose sur une architecture modulaire organisée autour de trois parties :

1. 🖥 Frontend – Angular

Interface moderne et ergonomique.

Page principale : Predict Budget avec :

Formulaire de saisie des caractéristiques d’un événement (durée, météo, trafic, etc.)

Bouton “Prédire le budget” pour envoyer les données au modèle IA

Bouton “Charger Données Test” pour préremplir les champs

Bouton “Télécharger le rapport” pour exporter les résultats en PDF

Pages complémentaires :

Add Event Features : ajout de nouvelles données d’événements.

Event Features List : liste des événements avec recherche, modification, suppression, et filtrage par ID.

2. ⚙ Backend Métier – Spring Boot

Gère la logique principale et la base de données.

Fournit des endpoints REST pour la gestion :

des événements,

des besoins logistiques,

et des caractéristiques (features).

Connecté à une base PostgreSQL / Supabase.

Contient les opérations CRUD : ajout, modification, suppression, recherche et filtrage.

3. 🤖 Backend IA – Flask

Déploie le modèle de Machine Learning (XGBoost).

Expose une API /predict qui reçoit les paramètres d’un événement et renvoie :

le budget prédit (en TND),

le niveau estimé (ex. “Modéré”),

la précision du modèle,

et le temps de réponse (< 1 seconde).

Communication directe avec Angular pour afficher les résultats en temps réel.

🔬 Partie IA : entraînement et intégration
Données

Les données proviennent d’un dataset événementiel contenant :

des paramètres objectifs (durée, trafic, foule, météo, âge, etc.),

et des indicateurs subjectifs (satisfaction, thème, type de transport, etc.).

Étapes réalisées

Nettoyage et préparation du dataset (traitement des valeurs manquantes, encodage, normalisation).

Entraînement de plusieurs modèles (RandomForest, Linear Regression, XGBoost, etc.).

Sélection du modèle le plus performant : XGBoost, offrant une précision d’environ 95 %.

Optimisation des hyperparamètres via GridSearchCV.

Export du modèle et du préprocesseur (model_xgb.pkl, preprocessor.pkl) pour utilisation dans Flask.

Déploiement : le modèle est chargé automatiquement à chaque lancement du serveur Flask.

🖼️ Fonctionnalités principales
Fonctionnalité	Description
Prédiction du budget	Estimation automatique du budget logistique d’un événement via IA.
Chargement de données test	Préremplissage rapide du formulaire pour tester l’IA.
Téléchargement de rapport PDF	Génération d’un rapport des résultats de prédiction.
Gestion d’événements	Ajout, modification, suppression et recherche d’événements.
Filtrage par ID	Consultation rapide d’un événement spécifique.
⚙️ Tests et performance

Des tests de charge ont été effectués avec JMeter :

Comparaison entre 100 et 200 utilisateurs simultanés.

Résultats :

Temps moyen : ~345 ms → 382 ms

Erreurs : 0 %

Throughput : x2 entre 100 et 200 users

SLA respecté et latence maîtrisée.

L’API est donc stable et scalable, capable de répondre en moins d’une seconde sans perte de performance.

🚀 Lancement du projet
1. Lancer le backend Spring Boot
cd backendIA
mvn spring-boot:run


➡️ Accès : http://localhost:8090

2. Lancer le backend Flask (IA)
cd trinta/ml-api
pip install -r requirements.txt
python app.py


➡️ Accès : http://localhost:5001/predict

3. Lancer le frontend Angular
cd trinta
npm install
ng serve


➡️ Accès : http://localhost:4200

💡 Valeur ajoutée

Combinaison concrète entre technologies logicielles et intelligence artificielle.

IA intégrée et déployée sous forme d’API réutilisable.

Interface claire, intuitive et réactive.

Génération automatique de rapports.

Tests de performance réalisés pour prouver la fiabilité du système.

👩‍💻 Réalisation

Rôle principal : conception et développement de la partie IA et intégration du modèle dans l’application.

Travail réalisé :

Nettoyage et préparation du dataset.

Entraînement du modèle XGBoost.

Déploiement de l’API Flask.

Intégration de la prédiction dans Angular.

Tests de performance et production du rapport.

🧱 Stack technique

Frontend : Angular

Backend métier : Spring Boot (Java)

Backend IA : Flask (Python)

Base de données : PostgreSQL (Supabase)

Modèle IA : XGBoost

Outils : Jupyter, GitHub, Postman, JMeter

📄 Licence

Projet académique réalisé dans le cadre de la validation “IA for Software Engineering” – classe 5SAE3.
