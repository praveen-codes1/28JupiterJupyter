from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows your React frontend to talk to Flask

@app.route("/")
def home():
    return jsonify({"message": "JJ ETA Flask backend is running!"})

@app.route("/predict", methods=["POST"])
def predict_eta():
    data = request.json
    # For now, just return the input as a dummy response
    return jsonify({
        "input": data,
        "predicted_eta": "25 mins"  # Replace with model logic later
    })

if __name__ == "__main__":
    app.run(debug=True)
