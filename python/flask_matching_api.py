# flask_matching_api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from math import radians, sin, cos, sqrt, atan2
import logging

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Autoriser les requêtes depuis Angular

class DriverMatchingService:
    def __init__(self):
        try:
            self.model = joblib.load('driver_matching_model.pkl')
            self.scaler = joblib.load('feature_scaler.pkl')
            
            with open('model_features.json', 'r') as f:
                import json
                self.feature_columns = json.load(f)
            
            logger.info("✅ Service de matching initialisé avec succès!")
        except Exception as e:
            logger.error(f"❌ Erreur lors du chargement: {e}")
            self.model = None

    def haversine_distance(self, lat1, lon1, lat2, lon2):
        """Calcule la distance en kilomètres entre deux points GPS"""
        R = 6371  # Rayon de la Terre en km
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * atan2(sqrt(a), sqrt(1-a))
        return R * c

    def estimate_travel_time(self, distance_km, road_type='primary'):
        """Estime le temps de trajet"""
        speeds = {'highway': 80, 'primary': 60, 'secondary': 50, 'urban': 30}
        traffic_factors = {'highway': 1.1, 'primary': 1.2, 'secondary': 1.3, 'urban': 1.4}
        
        average_speed = speeds.get(road_type, 50)
        traffic_factor = traffic_factors.get(road_type, 1.2)
        base_time = (distance_km / average_speed) * 60
        return base_time * traffic_factor

    def prepare_features(self, driver_data, rider_data):
        """Prépare les features pour la prédiction"""
        
        # Calcul de la distance
        distance_km = self.haversine_distance(
            driver_data['latitude'], driver_data['longitude'],
            rider_data['latitude'], rider_data['longitude']
        )
        
        # Features de compatibilité
        capacity_match = 1 if driver_data['capacity'] >= rider_data['passengerCount'] else 0
        
        # Compatibilité besoins spéciaux
        special_needs = rider_data.get('specialNeeds')
        if special_needs == 'PMR':
            special_needs_match = 1 if driver_data['vehicleType'] == 'adapted' else 0
        elif special_needs == 'child_seat':
            special_needs_match = 1 if driver_data['capacity'] >= (rider_data['passengerCount'] + 1) else 0
        else:
            special_needs_match = 1
        
        # Normalisation du prix
        normalized_price = (driver_data['pricePerKm'] - 0.3) / (1.0 - 0.3)
        
        # Encodage urgence
        urgency_map = {'low': 1, 'medium': 2, 'high': 3}
        urgency_level = urgency_map.get(rider_data.get('urgencyLevel', 'medium'), 2)
        
        # Temps total
        travel_time = self.estimate_travel_time(distance_km)
        total_time = travel_time + driver_data.get('responseTime', 5)
        
        # Ratio capacité
        capacity_ratio = driver_data['capacity'] / max(1, rider_data['passengerCount'])
        
        # Score qualité
        quality_score = (driver_data['rating'] * 0.6 + min(driver_data.get('experienceYears', 1) / 15, 1) * 0.4)
        
        features = {
            'capacity_match': capacity_match,
            'special_needs_match': special_needs_match,
            'capacity_ratio': capacity_ratio,
            'quality_score': quality_score,
            'normalized_price': normalized_price,
            'passenger_count': rider_data['passengerCount'],
            'urgency_level': urgency_level,
            'max_wait_time': rider_data.get('maxWaitTime', 15),
            'total_time_min': total_time,
            'response_time': driver_data.get('responseTime', 5)
        }
        
        return features

    def predict_match_score(self, driver_data, rider_data):
        """Prédit le score de matching"""
        if self.model is None:
            return 50.0  # Score par défaut
        
        features = self.prepare_features(driver_data, rider_data)
        
        # Création du vecteur dans le bon ordre
        feature_vector = [features[col] for col in self.feature_columns]
        feature_vector = np.array(feature_vector).reshape(1, -1)
        
        # Normalisation
        feature_vector_scaled = self.scaler.transform(feature_vector)
        
        # Prédiction
        score = self.model.predict(feature_vector_scaled)[0]
        
        return max(0, min(100, round(score, 1)))

    def find_best_drivers(self, rider_data, drivers_list, top_k=3):
        """Trouve les meilleurs chauffeurs pour un utilisateur"""
        matches = []
        
        for driver in drivers_list:
            if driver.get('available', True):
                score = self.predict_match_score(driver, rider_data)
                
                distance = self.haversine_distance(
                    driver['latitude'], driver['longitude'],
                    rider_data['latitude'], rider_data['longitude']
                )
                
                match_info = {
                    'driverId': str(driver['id']),
                    'score': score,
                    'distance': round(distance, 2),
                    'travelTime': round(self.estimate_travel_time(distance), 1),
                    'vehicleType': driver['vehicleType'],
                    'capacity': driver['capacity'],
                    'rating': driver['rating'],
                    'pricePerKm': driver['pricePerKm'],
                    'driverName': f"{driver.get('prenom', '')} {driver.get('nom', '')}".strip(),
                    'phoneNumber': driver.get('num_tel', ''),
                    'profilePicture': driver.get('image_url', ''),
                    'experienceYears': driver.get('experienceYears', 1),
                    'responseTime': driver.get('responseTime', 5)
                }
                matches.append(match_info)
        
        # Trier par score
        matches.sort(key=lambda x: x['score'], reverse=True)
        return matches[:top_k]

# Initialisation du service
matching_service = DriverMatchingService()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "OK", "message": "Driver Matching API is running"})

@app.route('/api/match-drivers', methods=['POST'])
def match_drivers():
    try:
        data = request.json
        logger.info(f"Received matching request: {data}")
        
        rider_data = data.get('rider')
        drivers_data = data.get('drivers', [])
        top_k = data.get('topK', 3)
        
        if not rider_data or not drivers_data:
            return jsonify({"error": "Données manquantes"}), 400
        
        # Trouver les meilleurs chauffeurs
        best_matches = matching_service.find_best_drivers(rider_data, drivers_data, top_k)
        
        response = {
            "success": True,
            "matchesFound": len(best_matches),
            "bestMatches": best_matches
        }
        
        logger.info(f"Matching completed: {len(best_matches)} matches found")
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error in match-drivers: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/predict-score', methods=['POST'])
def predict_score():
    try:
        data = request.json
        
        driver_data = data.get('driver')
        rider_data = data.get('rider')
        
        if not driver_data or not rider_data:
            return jsonify({"error": "Données manquantes"}), 400
        
        score = matching_service.predict_match_score(driver_data, rider_data)
        
        return jsonify({
            "success": True,
            "score": score,
            "driverId": driver_data.get('id'),
            "riderId": rider_data.get('id')
        })
        
    except Exception as e:
        logger.error(f"Error in predict-score: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting Flask Matching API on http://localhost:5000")
    print("📝 Available endpoints:")
    print("   GET  /api/health")
    print("   POST /api/match-drivers")
    print("   POST /api/predict-score")
    
    app.run(host='0.0.0.0', port=5000, debug=True)