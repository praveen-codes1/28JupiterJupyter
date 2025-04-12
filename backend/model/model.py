import pickle
import os

# Construct path to the model file
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'random_forest_model.pkl')

# Load the trained model
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

def predict_eta(input_data):
    """
    Predict ETA using the pre-trained RandomForest model.
    
    Args:
        input_data (list or array): A list containing the following 7 values in order:
            [home_lat, home_lon, day_of_week, departure_hour, trip_type_num, office_lat, office_lon]
    
    Returns:
        float: predicted time taken for the ride (ETA in minutes)
    """
    prediction = model.predict([input_data])
    return prediction[0]
