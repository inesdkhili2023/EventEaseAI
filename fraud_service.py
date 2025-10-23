# fraud_service.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from datetime import datetime
from scipy import sparse

# Charger modèles
model = joblib.load("fraud_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
scaler = joblib.load("scaler.pkl")

app = FastAPI(title="Event Fraud Detection (ML)")

# CORS (Angular)
origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model (se contente des champs utiles)
class EventIn(BaseModel):
    id: int | None = None
    title: str | None = ""
    description: str | None = ""
    price: float | None = 0.0
    capacity: int | None = 0
    startDate: str | None = None
    endDate: str | None = None

def safe_parse_date(s):
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00"))
    except:
        try:
            return datetime.fromisoformat(s)
        except:
            return None

@app.post("/check-fraud")
def check_fraud(event: EventIn):
    # preprocess text
    desc = (event.description or "").strip()
    X_text = vectorizer.transform([desc])  # sparse

    # numeric features
    price = float(event.price or 0.0)
    capacity = int(event.capacity or 0)
    s = safe_parse_date(event.startDate) if event.startDate else None
    e = safe_parse_date(event.endDate) if event.endDate else None
    if s and e:
        duration = max((e - s).days, 0)
    else:
        duration = 0

    X_num = np.array([[price, capacity, duration]])
    X_num_scaled = scaler.transform(X_num)

    # combine
    X_combined = sparse.hstack([X_text, sparse.csr_matrix(X_num_scaled)])
    # predict_proba
    prob = float(model.predict_proba(X_combined)[0][1])
    is_fraud = bool(prob >= 0.7)

    # breakdown: get contributions approx (we return simple components)
    # We can compute simple rule-based sub-scores for transparency:
    price_score = 1.0 if price <= 0 or price > 1000 else 0.0
    capacity_score = 1.0 if capacity <= 0 or capacity > 10000 else 0.0
    duration_score = 1.0 if duration < 0 else 0.0

    return {
        "fraud_score": round(prob, 2),
        "is_fraud": is_fraud,
        "breakdown": {
            "model_prob": round(prob, 2),
            "price_rule": price_score,
            "capacity_rule": capacity_score,
            "duration_rule": duration_score
        }
    }
