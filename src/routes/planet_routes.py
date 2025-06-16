from flask import Blueprint, jsonify
from models import db, Planet

# Definimos el blueprint
planet_bp = Blueprint('planet_bp', __name__)

# Endpoint: GET /planets → listar todos los planetas
@planet_bp.route('/planets', methods=['GET'])
def get_planets():
    # Consultamos todos los registros de la tabla Planet
    planet_list = Planet.query.all()

    # Serializamos los registros → convertimos a diccionarios
    results = list(map(lambda p: {
        "id": p.id,
        "name": p.name,
        "population": p.population,
        "terrain": p.terrain,
        "description": p.description
    }, planet_list))

    # Devolvemos un JSON con la lista de planetas
    return jsonify(results), 200

# Endpoint: GET /planets/<planet_id> → obtener un planeta por id
@planet_bp.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    # Buscamos el planeta por id
    planet = Planet.query.get(planet_id)

    # Si no existe, devolvemos 404
    if planet is None:
        return jsonify({"error": "Planet not found"}), 404

    # Si existe, lo devolvemos serializado
    result = {
        "id": planet.id,
        "name": planet.name,
        "population": planet.population,
        "terrain": planet.terrain,
        "description": planet.description
    }

    return jsonify(result), 200

from flask import request

# Endpoint: POST /planets → agregar un nuevo planeta
@planet_bp.route('/planets', methods=['POST'])
def create_planet():
    data = request.get_json()

    name = data.get('name')
    population = data.get('population')
    terrain = data.get('terrain')
    description = data.get('description')

    if not name:
        return jsonify({"error": "Name is required"}), 400

    new_planet = Planet(
        name=name,
        population=population,
        terrain=terrain,
        description=description
    )

    db.session.add(new_planet)
    db.session.commit()

    return jsonify({
        "msg": "Planet created successfully",
        "planet": {
            "id": new_planet.id,
            "name": new_planet.name
        }
    }), 201
