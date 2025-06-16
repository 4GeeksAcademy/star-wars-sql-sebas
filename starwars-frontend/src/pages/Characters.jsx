import Card from "../components/Card";
import Slider from "react-slick";

function Characters({ characters, favorites, fetchFavorites, fetchCharacters }) {
  const handleDelete = (id) => {
    console.log("🗑️ Deleting character ID:", id);
    fetch(`/people/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          fetchCharacters();
          fetchFavorites();
        } else {
          console.error("Error deleting character:", res.status);
        }
      })
      .catch((error) => console.error("Error deleting character:", error));
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Slider {...settings}>
      {characters.map((char) => (
        <div key={char.id} className="p-2">
          <Card
            item={char}
            type="people"
            favorites={favorites}
            fetchFavorites={fetchFavorites}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </Slider>
  );
}

function SampleNextArrow({ onClick }) {
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <span style={{ fontSize: "24px", color: "white" }}>{">"}</span>
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <span style={{ fontSize: "24px", color: "white" }}>{"<"}</span>
    </div>
  );
}

export default Characters;










