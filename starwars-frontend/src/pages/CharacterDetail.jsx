import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CHARACTER_IMAGES } from "../utils/images";

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`/people/${id}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data))
      .catch((error) => console.error("Error fetching character:", error));
  }, [id]);

  if (!character) return <div className="text-light mt-5">Loading...</div>;

  const imageUrl =
    CHARACTER_IMAGES[character.name] || "https://via.placeholder.com/600x400";

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={imageUrl}
            alt={character.name}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 text-light">
          <h1 className="display-4">{character.name}</h1>
          <p className="lead">{character.description || "No description available."}</p>
          <hr />
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Birth Year:</strong> {character.birth_year}</p>
          {/* Puedes agregar más datos si tenés */}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;


