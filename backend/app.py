from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from flask import send_from_directory
import os

# Load the trained model
with open('C:/Users/PRAVEEN PATIL/Desktop/jj_eta/jj_eta_app/backend/model/random_forest_model.pkl', 'rb') as f:
    model = pickle.load(f)

app = Flask(__name__, static_folder='../jj_eta_app/build', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return {'message': 'Hello from Flask'}

@app.route('/api/predict', methods=['POST'])
def predict():
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

    # Return the predicted ETA (in minutes)
    return jsonify({'predicted_eta': round(predicted_eta)})

if __name__ == '__main__':
    app.run(debug=True)
    
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')