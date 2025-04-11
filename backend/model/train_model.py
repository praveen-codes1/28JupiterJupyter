# backend/model/train_model.py

import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import joblib
import os

# Load the data
df = pd.read_csv(r"C:/Users/PRAVEEN PATIL/Desktop/jj_eta/jj_eta_app/Data/Final_Dataset_with_Bangalore_Arrival_Time.csv")

# Preprocessing
df["date"] = pd.to_datetime(df["date"])
df["day_of_week"] = df["date"].dt.day_name()

day_map = {
    "Monday": 0, "Tuesday": 1, "Wednesday": 2,
    "Thursday": 3, "Friday": 4, "Saturday": 5, "Sunday": 6
}
df["day_of_week_num"] = df["day_of_week"].map(day_map)
df["departure_hour"] = pd.to_datetime(df["departure_time"], format="%H:%M").dt.hour

trip_map = {
    "Home_to_office": 0,
    "Office_to_home": 1
}
df["trip_type_num"] = df["trip_type"].map(trip_map)

# Features and target
X = df[["home_lat", "home_lon", "day_of_week_num", "departure_hour", "trip_type_num", "baseline_duration_min"]]
y = df["baseline_duration_min"]

# Split and train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Score
pred = model.predict(X_test)
r2 = r2_score(y_test, pred)
print("Model trained! R² score:", r2)

# Save the model
model_dir = os.path.join(os.path.dirname(__file__), "model.pkl")
joblib.dump(model, model_dir)
print(f"Model saved at {model_dir}")
