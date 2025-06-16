from flask import Blueprint, jsonify, request
from models import db, People

people_bp = Blueprint('people_bp', __name__)

@people_bp.route('/people', methods=['GET'])
def get_people():
    people = People.query.all()
    results = [{
        "id": p.id,
        "name": p.name,
        "gender": p.gender,
        "birth_year": p.birth_year,
        "description": p.description
    } for p in people]
    return jsonify(results), 200

@people_bp.route('/people/<int:people_id>', methods=['GET'])
def get_person(people_id):
    person = People.query.get(people_id)
    if not person:
        return jsonify({"error": "Person not found"}), 404

    result = {
        "id": person.id,
        "name": person.name,
        "gender": person.gender,
        "birth_year": person.birth_year,
        "description": person.description
    }
    return jsonify(result), 200

@people_bp.route('/people', methods=['POST'])
def create_person():
    data = request.get_json()

    name = data.get("name")
    gender = data.get("gender")
    birth_year = data.get("birth_year")
    description = data.get("description")

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

@people_bp.route('/people/<int:people_id>', methods=['DELETE'])
def delete_person(people_id):
    print("🔥 Attempting to delete person ID:", people_id)
    person = People.query.get(people_id)
    if not person:
        return jsonify({"error": "Person not found"}), 404

    db.session.delete(person)
    db.session.commit()
    print("✅ Person deleted:", person.name)
    return jsonify({"msg": f"Person {person.name} deleted"}), 200

