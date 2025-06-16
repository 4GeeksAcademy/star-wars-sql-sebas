import Characters from "./Characters";
import Planets from "./Planets";
import AddPlanetModal from "../components/AddPlanetModal";

function Home({ favorites, fetchFavorites }) {
  return (
    <div className="container-fluid mt-5 px-5">
      <h2 className="text-light my-4">Characters</h2>
      <Characters favorites={favorites} fetchFavorites={fetchFavorites} />

      <h2 className="text-light my-4">Planets</h2>
      <Planets favorites={favorites} fetchFavorites={fetchFavorites} />

      <AddPlanetModal onPlanetCreated={fetchFavorites} />
    </div>
  );
}

export default Home;

