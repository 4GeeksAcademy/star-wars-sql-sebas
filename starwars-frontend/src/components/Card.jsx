import { Link } from "react-router-dom";
import { CHARACTER_IMAGES, PLANET_IMAGES } from "../utils/images";

function Card({ item, type, favorites, fetchFavorites, onDelete }) {
  const handleFavorite = (e) => {
    e.preventDefault(); // evita navegación

    const isFavorite = favorites.some((fav) =>
      type === "people"
        ? fav.people_id === item.id
        : fav.planet_id === item.id
    );

    const endpoint =
      type === "people"
        ? `/favorite/people/${item.id}`
        : `/favorite/planet/${item.id}`;

    if (!isFavorite) {
      fetch(endpoint, { method: "POST" })
        .then(() => {
          fetchFavorites();
        })
        .catch((error) => console.error("Error adding favorite:", error));
    }
  };

  const handleDelete = (e) => {
    e.preventDefault(); // evita navegación
    if (onDelete) {
      onDelete(item.id);
    }
  };

  const isFavorite = favorites.some((fav) =>
    type === "people" ? fav.people_id === item.id : fav.planet_id === item.id
  );

  const imageUrl =
    type === "people"
      ? CHARACTER_IMAGES[item.name] || "https://via.placeholder.com/400x200"
      : PLANET_IMAGES[item.name] || "https://via.placeholder.com/400x200";

  return (
    <Link
      to={`/${type}/${item.id}`}
      className="text-decoration-none"
      style={{
        flex: "0 0 auto",
        width: "200px",
        marginRight: "16px",
        position: "relative",
      }}
    >
      <div className="card mb-3">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={item.name}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="position-absolute top-0 end-0 m-2 d-flex flex-column">
          <button
            className={`btn btn-sm mb-1 ${
              isFavorite ? "btn-warning" : "btn-outline-warning"
            }`}
            onClick={handleFavorite}
          >
            ❤️
          </button>
          {onDelete && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleDelete}
            >
              🗑️
            </button>
          )}
        </div>

        <div className="card-body text-center">
          <h5 className="card-title">{item.name}</h5>
        </div>
      </div>
    </Link>
  );
}

export default Card;


