import "./App.css";
import Header from "./Header";
import FilterPanel from "./FilterPanel";
import LocationListPanel from "./LocationListPanel";
import MapPanel from "./MapPanel";
import { useEffect, useState } from "react";
import { getBaseURL } from "./utils";

function App() {
  const [filters, setFilters] = useState([]);
  const [locations, setLocation] = useState([]);
  const [center, setCenter] = useState({
    lat: 37.226596,
    lng: -80.423082,
  });

  const getLocations = async () => {
    const res = await fetch(
      `${getBaseURL()}/location/${center.lat}/${center.lng}/1000`
    );
    const json = await res.json();
    setLocation(json.locations);
  };
  useEffect(() => {
    getLocations();
  }, []);

  const filters_type = [];
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].checked) {
      filters_type.push(filters[i]);
    }
  }
  let filteredLocations = locations;
  if (filters_type.length > 0) {
    for (let i = 0; i < filters_type.length; i++) {
      const filter = filters_type[i];
      filteredLocations = locations.filter(
        (loc) =>
          loc.assist_type.accessibleWith[filter.query] ||
          loc.assist_type.partiallyAccessibleWith[filter.query]
      );
    }
  }
  return (
    <div className="App">
      <Header />
      <div className="main-panel">
        <FilterPanel onFiltersChanged={(filters) => setFilters(filters)} />
        <LocationListPanel locations={filteredLocations} />
        <MapPanel center={center} locations={filteredLocations} />
      </div>
    </div>
  );
}

export default App;
