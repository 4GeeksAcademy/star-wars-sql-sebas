from flask import Blueprint, jsonify
from models import db, Favorite, People, Planet

CURRENT_USER_ID = 1

favorites_bp = Blueprint('favorites_bp', __name__)

# Endpoint: GET /favorite → listar favoritos del usuario (con name incluido)
@favorites_bp.route('/favorite', methods=['GET'])
def get_favorites():
    favorites = Favorite.query.filter_by(user_id=CURRENT_USER_ID).all()

    results = []
    for f in favorites:
        if f.people_id is not None:
            # Es un personaje
            person = People.query.get(f.people_id)
            name = person.name if person else "Unknown Person"
        elif f.planet_id is not None:
            # Es un planeta
            planet = Planet.query.get(f.planet_id)
            name = planet.name if planet else "Unknown Planet"
        else:
            name = "Unknown"

        results.append({
            "id": f.id,
            "planet_id": f.planet_id,
            "people_id": f.people_id,
            "name": name  # 👈 esto es lo que te va a mostrar en el dropdown
        })

    return jsonify(results), 200

# Endpoint: POST /favorite/people/<people_id> → agregar personaje a favoritos
@favorites_bp.route('/favorite/people/<int:people_id>', methods=['POST'])
def add_favorite_people(people_id):
    existing_fav = Favorite.query.filter_by(user_id=CURRENT_USER_ID, people_id=people_id).first()
    if existing_fav:
        return jsonify({"msg": "Favorite already exists!"}), 200

    favorite = Favorite(user_id=CURRENT_USER_ID, people_id=people_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"msg": "Favorite added!"}), 201

# Endpoint: POST /favorite/planet/<int:planet_id> → agregar planeta a favoritos
@favorites_bp.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id):
    existing_fav = Favorite.query.filter_by(user_id=CURRENT_USER_ID, planet_id=planet_id).first()
    if existing_fav:
        return jsonify({"msg": "Favorite already exists!"}), 200

    favorite = Favorite(user_id=CURRENT_USER_ID, planet_id=planet_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"msg": "Favorite added!"}), 201

# Endpoint: DELETE /favorite/<id> → eliminar favorito por ID
@favorites_bp.route('/favorite/<int:favorite_id>', methods=['DELETE'])
def delete_favorite(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"msg": "Favorite deleted"}), 200






