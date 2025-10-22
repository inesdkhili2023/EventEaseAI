from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from recommendation_engine import RecommendationEngine

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration Supabase
SUPABASE_URL = "https://sovevtdhjfpkycbieywv.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvdmV2dGRoamZwa3ljYmlleXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNzA1MDgsImV4cCI6MjA3NTY0NjUwOH0.qfxiWt4vv47sYHl-vrboFiLXqN-sKPf3mDE4cjTUFi4"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialiser le moteur de recommandation
recommendation_engine = RecommendationEngine(supabase)

@app.route('/api/recommendations/<int:partnership_id>', methods=['GET'])
def get_recommendations(partnership_id):
    """
    Recommande des événements pour un partenariat donné
    """
    try:
        # Obtenir les recommandations
        recommendations = recommendation_engine.recommend_events(partnership_id)
        
        return jsonify({
            'success': True,
            'partnership_id': partnership_id,
            'recommendations': recommendations
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/retrain', methods=['POST'])
def retrain_model():
    """
    Réentraîner le modèle avec les nouvelles données
    """
    try:
        recommendation_engine.train_model()
        return jsonify({
            'success': True,
            'message': 'Model retrained successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    # Entraîner le modèle au démarrage
    print("Training recommendation model...")
    recommendation_engine.train_model()
    print("Model trained successfully!")
    
    # Démarrer l'application
    app.run(host='0.0.0.0', port=5000, debug=True)