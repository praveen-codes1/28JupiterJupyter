from flask import Flask
from flask_cors import CORS
from routes.predict import predict_bp  # Fixed this line

app = Flask(__name__)
CORS(app)

app.register_blueprint(predict_bp)  # Register the correct blueprint

@app.route('/')
def index():
    return {'message': 'Hello from Flask'}

if __name__ == '__main__':
    app.run(debug=True)
