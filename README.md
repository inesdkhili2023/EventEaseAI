# 🎯 EventEase - Plateforme Complète de Gestion d'Événements avec IA

## 📋 Vue d'ensemble

**EventEase** est une plateforme intelligente et complète de gestion d'événements qui combine ingénierie logicielle et intelligence artificielle pour offrir une expérience optimale aux organisateurs, participants, partenaires et chauffeurs.

La plateforme intègre plusieurs modules interconnectés :
- **Gestion d'événements** avec détection de fraude
- **Système de billetterie** et paiements sécurisés
- **Modération automatique** des commentaires
- **Prédiction budgétaire** logistique
- **Recommandation intelligente** de partenariats
- **Planification** des disponibilités chauffeurs
- **Assistant IA conversationnel** (Gemini)

---

## 🏗️ Architecture Globale
```
Frontend (Angular 18)              Backend (Spring Boot 3)           Services IA (Python)
├── Gestion Événements             ├── Event Management              ├── Détection Fraude (FastAPI + XGBoost)
├── Billetterie & Paiements        ├── Payment Processing            ├── Modération NLP (Flask + Logistic Regression)
├── Modération Commentaires        ├── Comment Moderation            ├── Prédiction Budget (Flask + XGBoost)
├── Prédiction Budget              ├── Supabase Integration          ├── Recommandation (Flask + Sentence-Transformers)
├── Recommandations Partenaires    ├── Gemini AI Service             └── Matching Chauffeurs (Flask + XGBoost)
├── Planning Chauffeurs            └── Driver Management
└── Chat Assistant IA              
```

**Base de données** : PostgreSQL / Supabase  
**Paiements** : Stripe Integration  
**Conteneurisation** : Docker Compose  
**Communication** : REST APIs + Spring Cloud Gateway

---

## 🚀 Modules et Fonctionnalités

### 1. 📅 Gestion d'Événements & Détection de Fraude

**Fonctionnalités :**
- Création, modification, suppression et consultation d'événements
- Filtrage par catégorie et recherche multicritères (titre, description, lieu)
- Affichage des détails : images, dates, capacité, prix, localisation
- **Détection automatique de fraude** via modèle XGBoost

**Technologies :**
- Frontend : Angular 18 + Material UI + Bootstrap
- Backend : Spring Boot 3 + JPA/Hibernate
- IA : FastAPI + XGBoost (précision ~85%)

**Flux d'utilisation :**
1. L'utilisateur consulte ou crée un événement
2. Les données sont récupérées depuis Spring Boot
3. Le service FastAPI calcule un **score de fraude** (0.0 à 1.0)
4. Les événements suspects sont signalés côté frontend avec alertes visuelles

---

### 2. 🎫 Système de Billetterie & Paiements Stripe

**Fonctionnalités :**
- Plans tarifaires flexibles et catégories de billets (VIP, Standard, Étudiant)
- Gestion des capacités et disponibilité en temps réel
- Prix dynamiques selon la demande
- **Paiements sécurisés** via Stripe (3D Secure)
- Gestion des remboursements et webhooks de synchronisation
- Analytiques et métriques de vente en temps réel

**Technologies :**
- Stripe Integration complète
- Supabase pour stockage des transactions
- Tableaux de bord interactifs (Angular + Recharts)

---

### 3. 🛡️ Modération Automatique des Commentaires (NLP)

**Objectif :** Maintenir un environnement sain en filtrant automatiquement les contenus toxiques.

**Fonctionnalités :**
- Détection et masquage automatique des commentaires toxiques via IA
- Interface d'administration pour gestion manuelle (Approuver/Rejeter)
- Classification en **6 catégories de toxicité** :
  - `toxic`, `severe_toxic`, `obscene`, `threat`, `insult`, `identity_hate`
- Système de signalement utilisateur
- Statistiques de modération en temps réel

**Techniques NLP utilisées :**
- Préprocessing : nettoyage, normalisation, suppression des stopwords
- Stemming : réduction des mots à leur racine (NLTK)
- Vectorisation **TF-IDF**
- Classification multi-labels avec **Logistic Regression + One-vs-Rest**

**Performance :**
- Précision : **85% AUC score**
- Temps de traitement : **< 2 secondes** par commentaire
- Throughput : **100+ commentaires/minute**
- Taux de faux positifs : **< 5%**

---

### 4. 💰 Prédiction Automatique du Budget Logistique

**Objectif :** Estimer automatiquement le budget logistique d'un événement selon ses caractéristiques.

**Fonctionnalités :**
- Formulaire de saisie des paramètres événementiels (durée, météo, trafic, foule, âge, etc.)
- Prédiction instantanée du **budget en TND**
- Affichage du niveau estimé (Faible, Modéré, Élevé)
- Téléchargement de rapport PDF
- Bouton "Charger Données Test" pour tests rapides

**Étapes IA :**
1. Nettoyage et préparation du dataset
2. Entraînement de modèles (RandomForest, Linear Regression, **XGBoost**)
3. Sélection du modèle optimal : **XGBoost** (précision ~95%)
4. Optimisation des hyperparamètres via GridSearchCV
5. Export du pipeline complet (`model_xgb.pkl`, `preprocessor.pkl`)
6. Déploiement Flask avec endpoint `/predict`

**Performance :**
- Temps de réponse : **< 1 seconde**
- Précision : **95%**

---

### 5. 🤝 Recommandation Intelligente de Partenariats

**Objectif :** Associer automatiquement les partenaires aux événements les plus pertinents.

**Fonctionnalités :**
- Analyse sémantique des descriptions d'événements et de partenariats
- Calcul de similarité via **embeddings Sentence-Transformers**
- Endpoint `/api/recommendations/{partnership_id}` pour obtenir les événements recommandés
- Affichage des **scores de similarité** et raisons des recommandations

**Technologies :**
- Modèle : **Sentence-Transformers** (BERT-based)
- Backend : Flask + Spring Boot
- Communication : REST APIs

---

### 6. 🚗 Planification des Disponibilités Chauffeurs & Matching IA

**Objectif :** Optimiser l'affectation des chauffeurs aux trajets selon leurs disponibilités et profils.

**Fonctionnalités :**
- Authentification via Supabase (rôle "CHAUFFEUR")
- Ajout, modification, suppression de créneaux disponibles
- Calendrier interactif **FullCalendar.js** avec :
  - Coloration dynamique (vert clair → 1 chauffeur, vert foncé → plusieurs)
  - Tooltips détaillés (nom, horaires, statut 🟢/🔴)
- Vues mensuelle et hebdomadaire
- **Matching IA** pour optimiser les affectations

**Modèle IA (XGBoost) :**
- Features : distance client ↔ chauffeur, taux d'acceptation, historique, note moyenne, disponibilité, météo, trafic
- Communication Spring Boot ↔ Flask via REST

**Flux d'utilisation :**
1. Le chauffeur se connecte via Supabase
2. Son `driverId` est récupéré automatiquement
3. Il ajoute des disponibilités via le formulaire
4. Le service IA propose les trajets optimaux
5. Le manager visualise toutes les planifications

---

### 7. 🤖 Assistant IA Conversationnel (Gemini)

**Objectif :** Support client 24/7 et navigation intelligente.

**Commandes Slash :**
- `/help` - Affiche toutes les commandes
- `/latest` - Les 5 derniers événements
- `/popular` - Événements les mieux notés
- `/contact` - Informations de contact

**Recherche Intelligente :**
- **Par ID** : "event 3" ou "event #3"
- **Par catégorie** : "tech events" ou "événements éducatifs"
- **Par localisation** : "events in Tunis"
- **Par prix** : "events under 50" ou "événements moins de 100€"

**Exemple d'interaction :**
```
Utilisateur: "Je cherche des événements tech à Tunis"
IA: 🔥 Top-rated Events:
1. Tech Conference 2024 — 💰 Price: 150 € | 📍 Location: Tunis
   📅 Date: 2024-03-15 → 2024-03-17
   Category: TECH
```

---

## ⚙️ Stack Technique Complète

| Couche | Technologies | Rôle |
|--------|-------------|------|
| **Frontend** | Angular 18, TypeScript, CoreUI, Material UI, Bootstrap, FullCalendar.js | Interface dynamique et responsive |
| **Backend Métier** | Spring Boot 3, JPA/Hibernate, PostgreSQL, Supabase | API REST et logique métier |
| **Services IA** | Python, Flask, FastAPI, XGBoost, Scikit-learn, NLTK, Sentence-Transformers | Modèles ML et NLP |
| **Paiements** | Stripe API | Transactions sécurisées |
| **Authentification** | Supabase Auth | Gestion des utilisateurs |
| **Infrastructure** | Docker Compose, Spring Cloud Gateway, Eureka | Microservices et conteneurisation |
| **IA Conversationnelle** | Google Gemini API | Assistant intelligent |

---

## 📊 Performances Globales

| Métrique | Valeur |
|----------|--------|
| **Détection Fraude** | 85% précision, < 2s de réponse |
| **Modération NLP** | 85% AUC, 100+ commentaires/min, < 5% faux positifs |
| **Prédiction Budget** | 95% précision, < 1s de réponse |
| **Recommandation Partenaires** | Similarité sémantique > 80% |
| **Matching Chauffeurs** | Optimisation en temps réel |

---

## 🛠️ Installation et Démarrage

### Prérequis
- **Java 17+** (Spring Boot)
- **Node.js 14+** (Angular)
- **Python 3.8+** (Services IA)
- **PostgreSQL** ou compte **Supabase**
- **Docker & Docker Compose**

### Lancement du Projet

#### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-organisation/eventease.git
cd eventease
```

#### 2. Configuration des variables d'environnement



# Services Ports
BACKEND_PORT=8090
FRAUD_SERVICE_PORT=8001
NLP_SERVICE_PORT=8002
BUDGET_SERVICE_PORT=5001
RECOMMENDATION_SERVICE_PORT=5002
```

#### 3. Lancer avec Docker Compose (Recommandé)
```bash
docker-compose up -d
```

#### 4. Lancement Manuel

**Backend Spring Boot :**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
➡️ Accès : `http://localhost:8090`

**Service Détection Fraude :**
```bash
cd fraud-service
pip install -r requirements.txt
python fraud_service.py
```
➡️ Accès : `http://localhost:8001`

**Service Modération NLP :**
```bash
cd nlp-service
pip install -r requirements.txt
python nlp_service.py
```
➡️ Accès : `http://localhost:8002`

**Service Prédiction Budget :**
```bash
cd ml-api
pip install -r requirements.txt
python app.py
```
➡️ Accès : `http://localhost:5001`

**Service Recommandation :**
```bash
cd recommendation
pip install -r requirements.txt
python app.py
```
➡️ Accès : `http://localhost:5002`

**Frontend Angular :**
```bash
cd frontend
npm install
ng serve
```
➡️ Accès : `http://localhost:4200`

---

## 📁 Structure du Projet
```
eventease/
│
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/
│   │   ├── controllers/       # REST Controllers
│   │   ├── services/          # Business Logic
│   │   ├── repositories/      # JPA Repositories
│   │   ├── entities/          # JPA Entities
│   │   └── dto/               # Data Transfer Objects
│   └── resources/
│       └── application.yml
│
├── frontend/                   # Angular Frontend
│   ├── src/app/
│   │   ├── services/          # HTTP Services
│   │   ├── components/        # UI Components
│   │   ├── pages/             # Page Components
│   │   └── models/            # TypeScript Models
│   └── assets/
│
├── fraud-service/             # Détection Fraude (FastAPI)
│   ├── fraud_service.py
│   ├── models/
│   └── requirements.txt
│
├── nlp-service/               # Modération NLP (Flask)
│   ├── nlp_service.py
│   ├── trained_model.pkl
│   └── requirements.txt
│
├── ml-api/                    # Prédiction Budget (Flask)
│   ├── app.py
│   ├── model_xgb.pkl
│   ├── preprocessor.pkl
│   └── requirements.txt
│
├── recommendation/            # Recommandation (Flask)
│   ├── app.py
│   ├── models/
│   └── requirements.txt
│
├── docker-compose.yml         # Docker Configuration
├── .env.example              # Environment Variables Template
└── README.md                 # Documentation
```

---

## 🧪 Tests

### Tests Backend (Spring Boot)
```bash
cd backend
mvn test
```

### Tests Frontend (Angular)
```bash
cd frontend
ng test
```

### Tests Services IA
```bash
cd fraud-service
pytest tests/

cd nlp-service
pytest tests/

cd ml-api
pytest tests/
```

---

## 📚 Documentation API

### Endpoints Principaux

#### Events API
- `GET /api/events` - Liste des événements
- `GET /api/events/{id}` - Détails d'un événement
- `POST /api/events` - Créer un événement
- `PUT /api/events/{id}` - Modifier un événement
- `DELETE /api/events/{id}` - Supprimer un événement

#### Fraud Detection API
- `POST /predict` - Calculer le score de fraude

#### NLP Moderation API
- `POST /moderate` - Analyser un commentaire

#### Budget Prediction API
- `POST /predict` - Prédire le budget logistique

#### Recommendation API
- `GET /api/recommendations/{partnership_id}` - Obtenir les recommandations

---

## 🧭 Améliorations Futures

- [ ] Pagination et tri avancés côté frontend et backend
- [ ] Notifications push pour événements critiques
- [ ] Tableau de bord unifié avec statistiques globales
- [ ] Intégration Keycloak pour gestion unifiée des rôles
- [ ] Mode mobile interactif pour les chauffeurs
- [ ] Stockage cloud sécurisé pour les images (AWS S3)
- [ ] Tests de charge automatisés (JMeter, Locust)
- [ ] CI/CD Pipeline (GitHub Actions, Jenkins)
- [ ] Monitoring et alerting (Prometheus, Grafana)
- [ ] Documentation API interactive (Swagger/OpenAPI)

---

## 👥 Équipe de Développement

| Membre | Rôle | Modules Principaux |
|--------|------|-------------------|
| **Malek Feki** | Full Stack / IA | Gestion Événements, Détection Fraude |
| **Ons El Guebli** | Full Stack / IA | Planning Chauffeurs, Matching IA |
| **Ala Bouchakour** | Full Stack / IA | Billetterie, Paiements Stripe |
| **Ahmed Chokri** | NLP / IA | Modération Commentaires |
| **Oumaima Sallemi** | ML / IA | Prédiction Budget Logistique |
| **Dkhili Ines** | ML / IA | Recommandation Partenariats |

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes :

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Projet académique réalisé dans le cadre du programme **5SAE3 - IA for Software Engineering**.

---


**EventEase** - *L'intelligence artificielle au service de vos événements* 🎉
