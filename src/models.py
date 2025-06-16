from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Tabla Users
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    # Esto es para que puedas acceder a user.favorites (relación 1 a muchos)
    favorites = db.relationship('Favorite', backref='user', lazy=True)

# Tabla People (personajes)
class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    gender = db.Column(db.String(50))
    birth_year = db.Column(db.String(50))
    description = db.Column(db.Text)

# Tabla Planet (planetas)
class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    population = db.Column(db.String(50))
    terrain = db.Column(db.String(50))
    description = db.Column(db.Text)

# Tabla Favorite (favoritos)
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    planet_id = db.Column(db.Integer, db.ForeignKey('planet.id'), nullable=True)
    people_id = db.Column(db.Integer, db.ForeignKey('people.id'), nullable=True)

