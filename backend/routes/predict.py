from flask import Blueprint, request, jsonify
import pickle
import numpy as np
import os

# Create the Blueprint
predict_route = Blueprint('predict_route', __name__)

# Load the model (make sure path is correct relative to this file)
model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'random_forest_model.pkl')
with open(model_path, 'rb') as file:
    model = pickle.load(file)

@predict_route.route('/api/predict', methods=['POST'])
def predict_eta():
    try:
        data = request.get_json()

        # Extract features from the request data
        home_lat = data.get('home_lat')
        home_lon = data.get('home_lon')
        day_of_week_num = data.get('day_of_week_num')
        departure_hour = data.get('departure_hour')
        trip_type_num = data.get('trip_type_num')
        office_lat = data.get('office_lat')
        office_lon = data.get('office_lon')

        # Create the feature array (input to the model)
        features = np.array([[home_lat, home_lon, day_of_week_num, departure_hour, trip_type_num, office_lat, office_lon]])

        # Predict the ETA using the trained model
        predicted_eta = model.predict(features)[0]
        
        # Return the predicted ETA as a rounded number of minutes
        return jsonify({'predicted_eta': f"{total_minutes} min"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
