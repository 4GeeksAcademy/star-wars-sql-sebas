"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from utils import APIException, generate_sitemap
from admin import setup_admin
from models import db, User
from routes.people_routes import people_bp
from routes.planet_routes import planet_bp
from routes.user_routes import user_bp
from routes.favorites_routes import favorites_bp

# Inicialización de la app
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de la base de datos (SQLite en desarrollo)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///starwars.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialización de extensiones
MIGRATE = Migrate(app, db)
db.init_app(app)

# ✅ Habilitamos CORS para cualquier origen (útil en Codespaces y desarrollo)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configurar panel de admin (opcional)
setup_admin(app)

# Manejo de errores personalizados
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Sitemap de la API
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# Endpoint de prueba
@app.route('/user', methods=['GET'])
def handle_hello():
    response_body = {
        "msg": "Hello, this is your GET /user response "
    }
    return jsonify(response_body), 200

# Registro de rutas
app.register_blueprint(people_bp)
app.register_blueprint(planet_bp)
app.register_blueprint(user_bp)
app.register_blueprint(favorites_bp)

# Main
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)





