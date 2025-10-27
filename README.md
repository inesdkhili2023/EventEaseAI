# 🧠 EventEase – Module Événements & IA (Gestion et détection de fraude)

## 👩‍💻 À propos du projet
Ce module fait partie d’une plateforme globale de gestion d’événements.  
Il permet de **créer, consulter, modifier et supprimer des événements**, avec **filtrage et recherche côté frontend**, et inclut une **détection d’événements frauduleux** via un modèle ML intégré.

Le **backend** est développé avec **Spring Boot**, le **frontend** avec **Angular**, et la **détection de fraude** est exposée via **FastAPI** utilisant un modèle **XGBoost**.

---

## 🧩 Structure du projet
📦 Project_Event
│
├── backend/ # Microservice Spring Boot
│ ├── src/main/java/org/example/backend/
│ │ ├── controllers/ # REST Controllers (Event)
│ │ ├── services/ # Logique métier
│ │ ├── repositories/ # Requêtes JPA
│ │ ├── entities/ # Entités JPA (Event)
│ │ └── DTO/ # Objets de transfert
│ └── resources/
│ └── application.properties # Configurations BDD et service
│
├── frontend/ # Application Angular
│ ├── src/app/
│ │ ├── services/ # Appels HTTP (EventService, FraudService)
│ │ ├── pages/
│ │ │ ├── event-list/ # Liste des événements
│ │ │ ├── event-detail/ # Détails d’un événement
│ │ │ └── event-form/ # Formulaire création/modification
│ └── assets/
│ └── styles/ # SCSS, thèmes, icons
│
├── fraud-service/ # Microservice ML FastAPI
│ ├── fraud_service.py # Endpoint /predict pour score de fraude
│ └── models/ # Modèle XGBoost entraîné
│
└── README.md # Documentation du module


---

## ⚙️ Technologies utilisées
| Couche | Technologie | Rôle |
|--------|-------------|------|
| **Frontend** | Angular 17 + TypeScript | Interface dynamique |
| | Angular Material + Bootstrap | Composants UI modernes |
| **Backend** | Spring Boot 3 | API REST principale |
| | JPA + Hibernate | Gestion ORM et base de données |
| | PostgreSQL | Base de données relationnelle |
| **IA & Fraud Detection** | Python (FastAPI + XGBoost) | Détection d’événements frauduleux |
| **Infra & Intégration** | Docker Compose | Conteneurisation microservices |
| | REST APIs | Communication frontend / backend / IA |

---

## 🚀 Fonctionnalités principales
### 📅 Module Événements
- Création, modification et suppression d’événements via formulaire Angular  
- Affichage dynamique dans une liste ou carte d’événements  
- Filtrage par catégorie et recherche par titre, description ou lieu  
- Affichage des détails incluant images, dates, capacité et prix  

### 🤖 Détection de fraude / événements suspects
- Modèle **XGBoost** entraîné sur des features d’événements  
- Service **FastAPI** exposant l’endpoint `/predict`  
- Lors de la création ou consultation, un **score de fraude** est affiché pour chaque événement  
- Score exploité côté frontend pour alerter l’utilisateur ou administrateur  

### 🔁 Intégration entre services
- Frontend Angular communique avec :
  - **Spring Boot** pour CRUD événements
  - **FastAPI** pour score de fraude  
- Backend Spring Boot et microservice IA communiquent via HTTP REST  

---

## 🧪 Exemple de flux d’utilisation
1️⃣ L’utilisateur consulte la liste d’événements  
2️⃣ Les événements sont récupérés depuis le backend Spring Boot  
3️⃣ Pour chaque événement, le score de fraude est calculé via le microservice FastAPI  
4️⃣ Les événements sont affichés côté frontend avec indication de risque  
5️⃣ L’utilisateur peut filtrer et rechercher des événements fiables  

---

## 🧭 Améliorations futures
- Pagination et tri côté frontend et backend  
- Notifications ou alertes pour événements à haut risque  
- Tableau de bord global avec statistiques de fraude  
- Authentification pour restreindre la création/modification  
- Stockage et upload d’images via cloud sécurisé  

---

## 👨‍💻 Auteur

**Malek Feki**  
🎓 Développeur Full Stack / IA  
💼 Spécialisation : Spring Boot, Angular, Python ML (XGBoost, FastAPI)  
📍 Technologies principales : Backend Java, Frontend Angular, Détection fraude ML  
GitHub : https://github.com/MalekeFeki  
Email : feki.malek@esprit.tn
