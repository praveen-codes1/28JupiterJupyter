# backend/routes/predict.py
from flask import Blueprint, request, jsonify
import joblib
import numpy as np
import os

predict_bp = Blueprint('predict', __name__)

# Load the model
model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'model.pkl')
model = joblib.load(model_path)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        # Extract input values
        hour = int(data['time'])
        day = int(data['day'])
        src_lat = float(data['sourceLat'])
        src_lon = float(data['sourceLon'])
        dest_lat = float(data['destLat'])
        dest_lon = float(data['destLon'])

        # Heuristic to classify trip type (0: Home_to_office, 1: Office_to_home)
        trip_type = 0 if hour <= 12 else 1

        # Example feature vector for model:
        input_features = np.array([[src_lat, src_lon, day, hour, trip_type, 0]])

        # Predict
        eta = model.predict(input_features)[0]

        return jsonify({'eta': round(eta, 2)})

    except Exception as e:
        print("Error during prediction:", e)
        return jsonify({'error': 'Prediction failed'}), 500
