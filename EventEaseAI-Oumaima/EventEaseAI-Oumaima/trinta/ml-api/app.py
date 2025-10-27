# app.py
import os
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# -----------------------------
# ⚙️ Config API
# -----------------------------
app = Flask(__name__)
# Autorise ton front Angular local. Ajoute d'autres origines si besoin
CORS(app, resources={r"/*": {"origins": ["http://localhost:4200"]}})

# -----------------------------
# 📦 Chargement des artefacts
# -----------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model_xgb.pkl")
PREP_PATH  = os.path.join(os.path.dirname(__file__), "preprocessor.pkl")

bundle_model = joblib.load(MODEL_PATH)     # XGBRegressor entraîné sur Total_Cost_log
preprocessor = joblib.load(PREP_PATH)      # ColumnTransformer (scaler + OneHot)

model = bundle_model  # alias

# ⚠️ IMPORTANT: ordre et noms des features brutes (avant encodage)
FEATURE_ORDER = [
    "Total_Duration",
    "Traffic_Level",
    "Crowd_Density",
    "Satisfaction_Score",
    "Age",
    "Budget_Category",
    "Weather",
    "Optimal_Route_Preference",
    "Gender",
    "Nationality",
    "Travel_Companions",
    "Preferred_Theme",
    "Preferred_Transport",
]

# -----------------------------
# 🩺 Healthcheck
# -----------------------------
@app.get("/health")
def health():
    return jsonify({"status": "ok"}), 200

# -----------------------------
# 🔮 Endpoint de prédiction
# -----------------------------
@app.post("/predict")
def predict():
    """
    Attendu (JSON):
    {
      "event_id": 123,
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
    """
    try:
        payload = request.get_json(force=True)
        if not payload:
            return jsonify({"error": "JSON body required"}), 400

        # ✅ Vérif champs obligatoires
        missing = [c for c in FEATURE_ORDER if c not in payload]
        if missing:
            return jsonify({"error": f"Missing fields: {missing}"}), 400

        # 🧱 Construire un DataFrame dans le bon ordre de colonnes
        row = {k: payload[k] for k in FEATURE_ORDER}
        X_raw = pd.DataFrame([row], columns=FEATURE_ORDER)

        # 🔧 Prétraitement (scaler + onehot)
        X_ready = preprocessor.transform(X_raw)

        # 🔮 Prédiction (log)
        y_log = model.predict(X_ready)
        # ↩️ Retour à l'échelle réelle (dinars)
        y_pred_tnd = float(np.expm1(y_log)[0])

        # 💰 Ajustement pour des valeurs réalistes de budget d'événement
        # Facteur correctif pour passer de l'échelle du modèle à des budgets réels
        SCALE_FACTOR = 1000  # Ajustez selon vos besoins (500, 1000, 1500, etc.)
        
        # Budget ajusté pour être cohérent avec la réalité économique
        realistic_budget = y_pred_tnd * SCALE_FACTOR
        
        # S'assurer que le budget minimum est de 100 TND
        final_budget = max(realistic_budget, 100.0)

        # Optionnel: retour des features transformées
        return jsonify({
            "prediction_tnd": round(final_budget, 2),
            "prediction_log": float(y_log[0]),
            "raw_prediction": round(y_pred_tnd, 2),  # Valeur brute pour debug
            "scale_factor": SCALE_FACTOR
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Lancer en dev
    app.run(host="0.0.0.0", port=5001, debug=True)