import "./App.css";
import Header from "./Header";
import FilterPanel from "./FilterPanel";
import LocationListPanel from "./LocationListPanel";
import MapPanel from "./MapPanel";
import SearchBox from "./Search";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-panel">
        <FilterPanel />
        <LocationListPanel />
        <MapPanel />
      </div>
    </div>
  );
}

export default App;
