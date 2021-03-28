import { Card, CardContent, Typography } from "@material-ui/core";
import { useState } from "react";
import { FILTERS } from "./FilterPanel";
import { DoneAll, Check } from "@material-ui/icons";
import ReviewsPanel from "./ReviewsPanel";

const LocationCard = ({ name, assist_type, onClick }) => {
  let { accessibleWith, partiallyAccessibleWith } = assist_type;
  if (accessibleWith === undefined) {
    accessibleWith = {};
  }
  if (partiallyAccessibleWith === undefined) {
    partiallyAccessibleWith = {};
  }
  const accessible_traits = {};
  for (let i = 0; i < FILTERS.length; i++) {
    let filter = FILTERS[i];
    if (accessibleWith[filter.query] === true) {
      accessible_traits[filter.query] = "FULL";
    } else if (partiallyAccessibleWith[filter.query] === true) {
      accessible_traits[filter.query] = "PARTIAL";
    }
  }

  const accessibleDisplay = FILTERS.map((filter) => {
    if (
      accessibleWith[filter.query] === null ||
      accessibleWith[filter.query] === undefined
    ) {
      return null;
    }
    let icon = null;
    if (accessible_traits[filter.query] === "FULL") {
      icon = <DoneAll />;
    } else if (accessible_traits[filter.query] === "PARTIAL") {
      icon = <Check />;
    }
    return (
      <li key={filter.query}>
        {filter.display} {icon}
      </li>
    );
  });

  return (
    <Card className="location-card" onClick={onClick}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <ul>{accessibleDisplay}</ul>
      </CardContent>
    </Card>
  );
};

const LocationListPanel = ({ locations }) => {
  let [selectedLocation, setSelectedLocation] = useState(null);
  console.log(locations[0]);
  const locationsDisplay = locations.map((loc) => (
    <LocationCard
      {...loc}
      key={loc.name}
      onClick={() => setSelectedLocation(loc)}
    />
  ));

  return (
    <div className="locations-list">
      <ReviewsPanel
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
      {locationsDisplay}
    </div>
  );
};

export default LocationListPanel;
