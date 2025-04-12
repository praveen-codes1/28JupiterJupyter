import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import pickle

# Load the cleaned dataset
df = pd.read_csv('C:/Users/PRAVEEN PATIL/Desktop/jj_eta/jj_eta_app/backend/Data/JJ_Final.csv')

# Extract departure hour from departure_time
df["departure_hour"] = pd.to_datetime(df["departure_time"]).dt.hour

# Map trip_type to numerical values
trip_map = {
    "Home_to_office": 0,
    "Office_to_home": 1
}
df["trip_type_num"] = df["trip_type"].map(trip_map)

# Features and target
X = df[["home_lat", "home_lon", "day_of_week", "departure_hour", "trip_type_num", "office_lat", "office_lon"]]
y = df["time_taken"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train model
model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
predictions = model.predict(X_test)
r2 = r2_score(y_test, predictions)
print("Model R^2 Score:", r2)

# Save model
with open('C:/Users/PRAVEEN PATIL/Desktop/jj_eta/jj_eta_app/backend/model/random_forest_model.pkl', "wb") as f:
    pickle.dump(model, f)
