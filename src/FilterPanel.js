import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { useState } from "react";

export const FILTERS = [
  { query: "wheelchair", display: "Wheelchair", checked: false },
  { query: "ramps", display: "Ramps", checked: false },
  {
    query: "deaf-accessible-crosswalks",
    display: "Deaf Accessible Crosswalks",
    checked: false,
  },
  { query: "braille_signs", display: "Braille Signs", checked: false },
  { query: "elevator", display: "Elevator", checked: false },
];

const FilterPanel = ({ onFiltersChanged }) => {
  const [filters, setFilters] = useState(FILTERS);
  const checkboxes = filters.map((filter) => (
    <FormControlLabel
      control={
        <Checkbox
          onChange={() => {
            const newFilters = [...filters];
            for (let i = 0; i < newFilters.length; i++) {
              if (newFilters[i].query == filter.query) {
                newFilters[i].checked = !newFilters[i].checked;
                break;
              }
            }
            setFilters(newFilters);
            if (onFiltersChanged) {
              onFiltersChanged(newFilters);
            }
          }}
          name={filter.query}
          checked={filter.checked}
        />
      }
      label={filter.display}
      key={filter.query}
    />
  ));
  return (
    <div className="filter-panel">
      <Typography variant="h5">Filter</Typography>
      {checkboxes}
    </div>
  );
};

export default FilterPanel;
