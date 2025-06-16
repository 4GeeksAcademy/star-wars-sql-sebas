import { useState } from "react";
import { Link } from "react-router-dom";
import AddCharacterModal from "./AddCharacterModal";
import AddPlanetModal from "./AddPlanetModal";

function Navbar({ favorites, handleRemoveFavorite, fetchFavorites, fetchCharacters, fetchPlanets }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100 px-3 py-2 shadow">
        <Link className="navbar-brand" to="/">STAR WARS</Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item me-3">
              <button
                className="btn btn-outline-light me-2"
                onClick={() => setShowModal(true)}
              >
                + Add Character
              </button>

              <button
                className="btn btn-outline-warning"
                data-bs-toggle="modal"
                data-bs-target="#addPlanetModal"
              >
                + Add Planet
              </button>
            </li>
            <li className="nav-item dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites <span className="badge bg-secondary">{favorites.length}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {favorites.length === 0 ? (
                  <li className="dropdown-item text-muted">No favorites</li>
                ) : (
                  favorites.map(fav => (
                    <li key={fav.id} className="dropdown-item d-flex justify-content-between align-items-center">
                      {fav.people_id ? `Character #${fav.people_id}` : `Planet #${fav.planet_id}`}
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleRemoveFavorite(fav.id)}
                      >
                        🗑️
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <AddCharacterModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCharacterAdded={fetchCharacters}
      />

      <AddPlanetModal onPlanetCreated={fetchPlanets} />
    </>
  );
}

export default Navbar;

