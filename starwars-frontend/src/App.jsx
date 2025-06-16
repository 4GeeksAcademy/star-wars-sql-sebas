import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CharacterDetail from "./pages/CharacterDetail";
import PlanetDetail from "./pages/PlanetDetail";

function App() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = () => {
    fetch('/favorite')
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error('Error fetching favorites:', error));
  };

  const handleRemoveFavorite = (favoriteId) => {
    fetch(`/favorite/${favoriteId}`, { method: 'DELETE' })
      .then(() => {
        fetchFavorites();
      })
      .catch(error => console.error('Error deleting favorite:', error));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <Router>
      <Navbar favorites={favorites} handleRemoveFavorite={handleRemoveFavorite} />
      <div className="mt-5 pt-5"> {/* spacing so content not hidden by navbar */}
        <Routes>
          <Route path="/" element={<Home favorites={favorites} fetchFavorites={fetchFavorites} />} />
          <Route path="/people/:id" element={<CharacterDetail />} />
          <Route path="/planets/:id" element={<PlanetDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;






