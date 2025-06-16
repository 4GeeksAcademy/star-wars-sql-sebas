from flask import Blueprint, jsonify, request
from models import db, Planet

planet_bp = Blueprint('planet_bp', __name__)

@planet_bp.route('/planets', methods=['GET'])
def get_planets():
    planets = Planet.query.all()
    results = [{
        "id": p.id,
        "name": p.name,
        "population": p.population,
        "terrain": p.terrain,
        "description": p.description
    } for p in planets]
    return jsonify(results), 200

@planet_bp.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    planet = Planet.query.get(planet_id)
    if not planet:
        return jsonify({"error": "Planet not found"}), 404

    result = {
        "id": planet.id,
        "name": planet.name,
        "population": planet.population,
        "terrain": planet.terrain,
        "description": planet.description
    }
    return jsonify(result), 200

@planet_bp.route('/planets', methods=['POST'])
def create_planet():
    data = request.get_json()

    name = data.get("name")
    population = data.get("population")
    terrain = data.get("terrain")
    description = data.get("description")

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

@planet_bp.route('/planets/<int:planet_id>', methods=['DELETE'])
def delete_planet(planet_id):
    print("🔥 Attempting to delete planet ID:", planet_id)
    planet = Planet.query.get(planet_id)
    if not planet:
        return jsonify({"error": "Planet not found"}), 404

    db.session.delete(planet)
    db.session.commit()
    print("✅ Planet deleted:", planet.name)
    return jsonify({"msg": f"Planet {planet.name} deleted"}), 200
