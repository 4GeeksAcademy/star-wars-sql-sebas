from flask import Blueprint, jsonify
from models import db, User, Favorite

# Definimos el blueprint
user_bp = Blueprint('user_bp', __name__)

# Endpoint: GET /users → listar todos los usuarios
@user_bp.route('/users', methods=['GET'])
def get_users():
    user_list = User.query.all()

    results = list(map(lambda u: {
        "id": u.id,
        "email": u.email
    }, user_list))

    return jsonify(results), 200

# Endpoint: GET /users/favorites → listar favoritos del usuario
@user_bp.route('/users/favorites', methods=['GET'])
def get_user_favorites():
    CURRENT_USER_ID = 1  # Hardcodeado para ahora

    favorites = Favorite.query.filter_by(user_id=CURRENT_USER_ID).all()

    results = []
    for fav in favorites:
        if fav.planet_id:
            results.append({"type": "planet", "id": fav.planet_id})
        elif fav.people_id:
            results.append({"type": "people", "id": fav.people_id})

    return jsonify(results), 200  # ✅ devolvemos JSON
