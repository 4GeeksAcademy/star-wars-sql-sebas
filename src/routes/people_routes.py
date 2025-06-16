from flask import Blueprint, jsonify
from models import db, People

# Definimos el blueprint
people_bp = Blueprint('people_bp', __name__)

# Endpoint: GET /people → listar todos los personajes
@people_bp.route('/people', methods=['GET'])
def get_people():
    # Consultamos todos los registros de la tabla People
    people_list = People.query.all()

    # Serializamos los registros → convertimos a diccionarios
    results = list(map(lambda p: {
        "id": p.id,
        "name": p.name,
        "gender": p.gender,
        "birth_year": p.birth_year,
        "description": p.description
    }, people_list))

    # Devolvemos un JSON con la lista de personajes
    return jsonify(results), 200

# Endpoint: GET /people/<people_id> → obtener un personaje por id
@people_bp.route('/people/<int:people_id>', methods=['GET'])
def get_person(people_id):
    # Buscamos el personaje por id
    person = People.query.get(people_id)

    # Si no existe, devolvemos 404
    if person is None:
        return jsonify({"error": "Person not found"}), 404

    # Si existe, lo devolvemos serializado
    result = {
        "id": person.id,
        "name": person.name,
        "gender": person.gender,
        "birth_year": person.birth_year,
        "description": person.description
    }

    return jsonify(result), 200

# Endpoint: POST /people → agregar un nuevo personaje
@people_bp.route('/people', methods=['POST'])
def create_person():
    data = request.get_json()

    name = data.get('name')
    gender = data.get('gender')
    birth_year = data.get('birth_year')
    description = data.get('description')

    if not name:
        return jsonify({"error": "Name is required"}), 400

    new_person = People(
        name=name,
        gender=gender,
        birth_year=birth_year,
        description=description
    )

    db.session.add(new_person)
    db.session.commit()

    return jsonify({
        "msg": "Person created successfully",
        "person": {
            "id": new_person.id,
            "name": new_person.name
        }
    }), 201

