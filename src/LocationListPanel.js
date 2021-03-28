import { Card, CardContent, Typography } from "@material-ui/core";
import { useState } from "react";
import { FILTERS } from "./FilterPanel";
import { DoneAll, Check } from "@material-ui/icons";

const LocationCard = ({ name, assist_type }) => {
  const { accessibleWith, partiallyAccessibleWith } = assist_type;
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
    <Card className="location-card">
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <ul>{accessibleDisplay}</ul>
      </CardContent>
    </Card>
  );
};

const LocationListPanel = () => {
  let [selectedLocation, setSelectedLocation] = useState(null);
  const locations = [
    {
      assist_type: {
        accessibleWith: {
          wheelchair: false,
        },
        partiallyAccessibleWith: {
          wheelchair: true,
        },
      },
      city: "",
      description: "",
      location: [-80.4204814, 37.2288298],
      location_type: "place_of_worship",
      name: "War Memorial Chapel",
      state: "",
    },
    {
      assist_type: {
        accessibleWith: {
          wheelchair: false,
        },
        partiallyAccessibleWith: {
          wheelchair: true,
        },
      },
      city: "",
      description: "",
      location: [-80.4204814, 37.2288298],
      location_type: "place_of_worship",
      name: "War Memorial Chapel",
      state: "",
    },
    {
      assist_type: {
        accessibleWith: {
          wheelchair: false,
        },
        partiallyAccessibleWith: {
          wheelchair: true,
        },
      },
      city: "",
      description: "",
      location: [-80.4204814, 37.2288298],
      location_type: "place_of_worship",
      name: "War Memorial Chapel",
      state: "",
    },
    {
      assist_type: {
        accessibleWith: {
          wheelchair: false,
        },
        partiallyAccessibleWith: {
          wheelchair: true,
        },
      },
      city: "",
      description: "",
      location: [-80.4204814, 37.2288298],
      location_type: "place_of_worship",
      name: "War Memorial Chapel",
      state: "",
    },
    {
      assist_type: {
        accessibleWith: {
          wheelchair: false,
        },
        partiallyAccessibleWith: {
          wheelchair: true,
        },
      },
      city: "",
      description: "",
      location: [-80.4204814, 37.2288298],
      location_type: "place_of_worship",
      name: "War Memorial Chapel",
      state: "",
    },
    {
      assist_type: {
        accessibleWith: {
          wheelchair: false,
        },
        partiallyAccessibleWith: {
          wheelchair: true,
        },
      },
      city: "",
      description: "",
      location: [-80.4204814, 37.2288298],
      location_type: "place_of_worship",
      name: "War Memorial Chapel",
      state: "",
    },
    {
      assist_type: {
        accessibleWith: {
          wheelchair: false,
        },
        partiallyAccessibleWith: {
          wheelchair: true,
        },
      },
      city: "",
      description: "",
      location: [-80.4204814, 37.2288298],
      location_type: "place_of_worship",
      name: "War Memorial Chapel",
      state: "",
    },
    {
      assist_type: {
        accessibleWith: {
          wheelchair: false,
        },
        partiallyAccessibleWith: {
          wheelchair: true,
        },
      },
      city: "",
      description: "",
      location: [-80.4204814, 37.2288298],
      location_type: "place_of_worship",
      name: "War Memorial Chapel",
      state: "",
    },
    {
      assist_type: {
        accessibleWith: {
          wheelchair: false,
        },
        partiallyAccessibleWith: {
          wheelchair: true,
        },
      },
      city: "",
      description: "",
      location: [-80.4204814, 37.2288298],
      location_type: "place_of_worship",
      name: "War Memorial Chapel",
      state: "",
    },
  ];

  const locationsDisplay = locations.map((loc) => (
    <LocationCard
      {...loc}
      key={loc.name}
      onClick={(location) => setSelectedLocation(location)}
    />
  ));

  return <div className="locations-list">{locationsDisplay}</div>;
};

export default LocationListPanel;
