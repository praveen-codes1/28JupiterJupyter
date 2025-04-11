from flask import Flask
from flask_cors import CORS
from routes.predict import predict_route  # This will be our prediction blueprint

app = Flask(__name__)
CORS(app)

# Registering the predict route
app.register_blueprint(predict_route)

# Optional test route
@app.route('/api/hello')
def hello():
    return {'message': 'Hello from Flask'}

if __name__ == '__main__':
    app.run(debug=True)
