import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CharacterDetail from "./pages/CharacterDetail";
import PlanetDetail from "./pages/PlanetDetail";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);

  const fetchFavorites = () => {
    fetch("/favorite")
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error("Error fetching favorites:", error));
  };

  const fetchCharacters = () => {
    fetch("/people")
      .then(res => res.json())
      .then(data => setCharacters(data))
      .catch(err => console.error("Error fetching characters:", err));
  };

  const fetchPlanets = () => {
    fetch("/planets")
      .then(res => res.json())
      .then(data => setPlanets(data))
      .catch(err => console.error("Error fetching planets:", err));
  };

  const handleRemoveFavorite = (favoriteId) => {
    fetch(`/favorite/${favoriteId}`, { method: 'DELETE' })
      .then(() => fetchFavorites())
      .catch(error => console.error('Error deleting favorite:', error));
  };

  useEffect(() => {
    fetchFavorites();
    fetchCharacters();
    fetchPlanets();
  }, []);

  return (
    <Router>
      <Navbar
        favorites={favorites}
        handleRemoveFavorite={handleRemoveFavorite}
        fetchFavorites={fetchFavorites}
        fetchCharacters={fetchCharacters}
        fetchPlanets={fetchPlanets}
      />
      <div className="mt-5 pt-5">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                fetchFavorites={fetchFavorites}
                characters={characters}
                planets={planets}
                fetchCharacters={fetchCharacters}
                fetchPlanets={fetchPlanets}
              />
            }
          />
          <Route path="/people/:id" element={<CharacterDetail />} />
          <Route path="/planets/:id" element={<PlanetDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;









