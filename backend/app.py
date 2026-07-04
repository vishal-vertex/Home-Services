from flask import Flask
from flask_cors import CORS

from routes.user_routes import user_bp
from routes.service_routes import service_bp
from routes.problem_routes import problem_bp
from routes.search_routes import search_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(user_bp)
app.register_blueprint(service_bp)
app.register_blueprint(problem_bp)
app.register_blueprint(search_bp)

if __name__ == "__main__":
    app.run(debug=True)