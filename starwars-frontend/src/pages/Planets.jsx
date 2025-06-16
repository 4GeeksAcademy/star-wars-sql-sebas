import { useEffect, useState } from "react";
import Card from "../components/Card";
import Slider from "react-slick";

function Planets({ favorites, fetchFavorites }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("/planets")
      .then((response) => response.json())
      .then((data) => setPlanets(data))
      .catch((error) => console.error("Error fetching planets:", error));
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {planets.map((planet) => (
        <div key={planet.id} className="p-2">
          <Card
            item={planet}
            type="planet"
            favorites={favorites}
            fetchFavorites={fetchFavorites}
          />
        </div>
      ))}
    </Slider>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <span style={{ fontSize: "24px", color: "white" }}>{">"}</span>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <span style={{ fontSize: "24px", color: "white" }}>{"<"}</span>
    </div>
  );
}

export default Planets;





