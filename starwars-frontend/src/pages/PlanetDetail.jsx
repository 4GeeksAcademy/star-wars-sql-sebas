import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PLANET_IMAGES } from "../utils/images";

function PlanetDetail() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetch(`/planets/${id}`)
      .then((response) => response.json())
      .then((data) => setPlanet(data))
      .catch((error) => console.error("Error fetching planet:", error));
  }, [id]);

  if (!planet) return <div className="text-light mt-5">Loading...</div>;

  const imageUrl =
    PLANET_IMAGES[planet.name] || "https://via.placeholder.com/600x400";

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={imageUrl}
            alt={planet.name}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 text-light">
          <h1 className="display-4">{planet.name}</h1>
          <p className="lead">{planet.description || "No description available."}</p>
          <hr />
          <p><strong>Population:</strong> {planet.population}</p>
          <p><strong>Terrain:</strong> {planet.terrain}</p>
          {/* Puedes agregar más datos si tenés */}
        </div>
      </div>
    </div>
  );
}

export default PlanetDetail;


