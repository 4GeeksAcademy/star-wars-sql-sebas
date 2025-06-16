# 🪐 Star Wars Blog - Fullstack API + Frontend

Este proyecto es una aplicación fullstack desarrollada como parte del bootcamp de 4Geeks Academy. Permite gestionar y visualizar personajes y planetas del universo de Star Wars, además de marcar favoritos.

El proyecto incluye:

- Un **backend en Flask** con SQLAlchemy y una API RESTful  
- Un **frontend en React** con Vite y Bootstrap  
- Funcionalidad completa de CRUD (crear, leer, eliminar) para personajes y planetas  
- Sistema de favoritos sincronizado  
- Estilo visual inspirado en el Star Wars Databank  

---

## 🚀 Tecnologías utilizadas

- Backend: Python, Flask, SQLAlchemy, Flask-Migrate, Flask-CORS  
- Base de datos: SQLite (modo local)  
- Frontend: React, Vite, Bootstrap 5  
- Otros: React Router, react-slick para carruseles  

---

## 📦 Estructura del proyecto
star-wars-sql-sebas/
├── app.py # punto de entrada del backend
├── models.py # modelos SQLAlchemy
├── routes/ # rutas separadas por entidad
├── starwars-frontend/ # frontend en React
│ └── src/
│ ├── components/ # modales, navbar, card genérica
│ ├── pages/ # vistas Characters, Planets, Home, Detail
│ └── App.jsx # routing principal


---

## ⚙️ Cómo ejecutar el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/4GeeksAcademy/star-wars-sql-sebas.git
cd star-wars-sql-sebas

2. Instalar y ejecutar el backend (Flask)
pipenv install
pipenv shell
pipenv run init         # crea la base de datos
pipenv run migrate      # aplica las migraciones
pipenv run upgrade      # actualiza la base
pipenv run start        # inicia el backend en http://localhost:8000

3. Instalar y ejecutar el frontend (React)
cd starwars-frontend
npm install
npm run dev

