# Gestion 3 – Gestion Paiements et Billets

## Vue d'ensemble

Ce module implémente un système complet de gestion des paiements et billets pour votre plateforme d'événements, incluant :

- **Gestion des plans de billets** (VIP, Standard, Gratuit)
- **Intégration Stripe** pour les paiements sécurisés
- **Analytiques des ventes** en temps réel
- **Chatbot IA intelligent** pour l'assistance client
- **Interface responsive** avec Angular 18+

## 🚀 Installation et Configuration

### 1. Dépendances Installées

```bash
npm install @stripe/stripe-js stripe --legacy-peer-deps
```

### 2. Configuration Stripe

#### Étape 1 : Créer un compte Stripe
1. Allez sur [stripe.com](https://stripe.com)
2. Créez un compte (mode test pour commencer)
3. Récupérez vos clés API dans le dashboard

#### Étape 2 : Configuration des clés
Modifiez `src/environments/environment.stripe.ts` :

```typescript
export const stripeConfig = {
  publishableKey: 'pk_test_votre_cle_publique_ici',
  webhookSecret: 'whsec_votre_secret_webhook_ici',
  currency: 'TND', // Dinar tunisien
  country: 'TN',
  // ... autres configurations
};
```

#### Étape 3 : Configuration du Webhook
1. Dans le dashboard Stripe, allez dans "Webhooks"
2. Ajoutez une nouvelle endpoint : `https://votre-domaine.com/api/payments/webhook`
3. Sélectionnez les événements :
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.dispute.created`
4. Copiez le secret du webhook

### 3. Configuration Backend (Spring Boot)

#### Dépendances Maven
```xml
<dependency>
    <groupId>com.stripe</groupId>
    <artifactId>stripe-java</artifactId>
    <version>24.16.0</version>
</dependency>
```

#### Configuration Stripe
```java
@Configuration
public class StripeConfig {
    
    @Value("${stripe.secret.key}")
    private String secretKey;
    
    @Bean
    public Stripe stripe() {
        Stripe.apiKey = secretKey;
        return new Stripe();
    }
}
```

#### Application Properties
```properties
stripe.secret.key=sk_test_votre_cle_secrete
stripe.publishable.key=pk_test_votre_cle_publique
stripe.webhook.secret=whsec_votre_secret_webhook
```

## 📁 Structure des Fichiers

```
src/app/
├── models/
│   ├── ticket-category.model.ts      # Modèles de données
│   └── chatbot.model.ts              # Modèles du chatbot
├── services/
│   ├── ticket.service.ts             # Service de gestion des billets
│   ├── payment.service.ts            # Service de paiement
│   ├── chatbot.service.ts            # Service du chatbot IA
│   └── stripe.service.ts             # Service Stripe
├── pages/ticket-management/
│   ├── ticket-management.component.ts    # Page principale
│   ├── ticket-plans-list/               # Liste des plans
│   ├── ticket-plan-form/                # Formulaire de création/édition
│   ├── sales-analytics/                 # Analytiques des ventes
│   ├── chatbot/                         # Chatbot IA
│   └── payment/                          # Interface de paiement
└── environments/
    └── environment.stripe.ts             # Configuration Stripe
```

## 🎯 Fonctionnalités Implémentées

### 1. Gestion des Plans de Billets

#### Création
- **Catégories** : VIP, Standard, Gratuit
- **Prix** : Support du Dinar tunisien (TND)
- **Quota** : Nombre de billets disponibles
- **Dates** : Période de vente
- **Statut** : Actif/Inactif

#### Gestion
- **Modification** : Prix et quota (si pas de ventes)
- **Suppression** : Seulement si pas de ventes
- **Désactivation** : Arrêt des ventes
- **Validation** : Contrôles métier intégrés

### 2. Intégration Stripe

#### Paiements Sécurisés
- **Cartes** : Visa, Mastercard, American Express
- **Mobile Money** : Pour le marché tunisien
- **Virements** : Transferts bancaires
- **Sécurité** : Chiffrement end-to-end

#### Fonctionnalités
- **Intents de paiement** : Sécurisation des transactions
- **Méthodes de paiement** : Sauvegarde pour réutilisation
- **Remboursements** : Partiels ou complets
- **Webhooks** : Mise à jour temps réel

### 3. Analytiques des Ventes

#### Métriques Principales
- **Revenus totaux** : Chiffre d'affaires
- **Billets vendus** : Volume des ventes
- **Remboursements** : Montants remboursés
- **Répartition** : Par catégorie de billet

#### Visualisations
- **Graphiques** : Évolution des ventes
- **Tableaux** : Plans les plus vendus
- **Tendances** : Analyse temporelle
- **Export** : Données CSV/PDF

### 4. Chatbot IA Intelligent

#### Capacités
- **FAQ automatique** : Réponses aux questions courantes
- **Guidage d'achat** : Processus de commande
- **Support client** : Assistance 24/7
- **Multi-langue** : Français, Arabe, Anglais

#### Intégrations Futures
- **WhatsApp** : Messaging business
- **Facebook Messenger** : Chat sur Facebook
- **SMS** : Notifications par SMS
- **Email** : Support par email

## 🔧 Configuration Avancée

### Variables d'Environnement

```bash
# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/events
SPRING_DATASOURCE_USERNAME=events_user
SPRING_DATASOURCE_PASSWORD=events_password

# Chatbot IA
OPENAI_API_KEY=sk-...
CHATBOT_MODEL=gpt-3.5-turbo
```

### Configuration de Base de Données

```sql
-- Table des plans de billets
CREATE TABLE ticket_plans (
    id UUID PRIMARY KEY,
    event_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'TND',
    quota INTEGER NOT NULL,
    sold INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    sales_start_date TIMESTAMP,
    sales_end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table des ventes
CREATE TABLE ticket_sales (
    id UUID PRIMARY KEY,
    ticket_plan_id UUID REFERENCES ticket_plans(id),
    customer_id UUID,
    customer_email VARCHAR(255),
    customer_name VARCHAR(255),
    quantity INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'TND',
    payment_status VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50),
    stripe_payment_intent_id VARCHAR(255),
    refunded_amount DECIMAL(10,2) DEFAULT 0,
    refunded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Déploiement

### 1. Build de Production

```bash
ng build --configuration production
```

### 2. Variables d'Environnement

```bash
# Production
export STRIPE_PUBLISHABLE_KEY=pk_live_...
export STRIPE_SECRET_KEY=sk_live_...
export STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Sécurité

### Bonnes Pratiques Implémentées

1. **Validation côté client et serveur**
2. **Chiffrement des données sensibles**
3. **Tokens CSRF pour les formulaires**
4. **Rate limiting sur les API**
5. **Logs de sécurité**
6. **Audit trail des transactions**

### Configuration HTTPS

```nginx
server {
    listen 443 ssl;
    server_name votre-domaine.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 Monitoring et Analytics

### Métriques à Surveiller

1. **Taux de conversion** : Visiteurs → Acheteurs
2. **Temps de réponse** : API et paiements
3. **Erreurs de paiement** : Taux d'échec
4. **Satisfaction client** : Chatbot et support
5. **Performance** : Temps de chargement

### Outils Recommandés

- **Stripe Dashboard** : Monitoring des paiements
- **Google Analytics** : Comportement utilisateur
- **Sentry** : Gestion des erreurs
- **New Relic** : Performance applicative

## 🆘 Support et Maintenance

### Logs Importants

```bash
# Logs Stripe
tail -f /var/log/stripe-webhooks.log

# Logs d'application
tail -f /var/log/events-app.log

# Logs de base de données
tail -f /var/log/postgresql/postgresql.log
```

### Commandes de Maintenance

```bash
# Nettoyage des logs
find /var/log -name "*.log" -mtime +30 -delete

# Sauvegarde de la base
pg_dump events_db > backup_$(date +%Y%m%d).sql

# Mise à jour des dépendances
npm audit fix
```

## 📞 Contact et Support

Pour toute question ou problème :

- **Email** : support@votreentreprise.com
- **Téléphone** : +216 XX XXX XXX
- **Documentation** : [docs.votreentreprise.com](https://docs.votreentreprise.com)
- **GitHub** : [github.com/votreentreprise/events-platform](https://github.com/votreentreprise/events-platform)

---

**Note** : Ce système est conçu pour être évolutif et sécurisé. Assurez-vous de tester toutes les fonctionnalités en mode test avant de passer en production.
