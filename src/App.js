import "./App.css";
import Header from "./Header";
import FilterPanel from "./FilterPanel";
import LocationListPanel from "./LocationListPanel";
import MapPanel from "./MapPanel";
import { useState } from "react";

function App() {
  const [filters, setFilters] = useState([]);

  return (
    <div className="App">
      <Header />
      <div className="main-panel">
        <FilterPanel onFiltersChanged={(filters) => setFilters(filters)} />
        <LocationListPanel />
        <MapPanel />
      </div>
    </div>
  );
}

export default App;
