import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";

const FILTERS = [
  { query: "wheelchair", display: "Wheelchair Accesible" },
  { query: "ramps", display: "Ramps" },
  {
    query: "deaf-accessible-crosswalks",
    display: "Deaf Accessible Crosswalks",
  },
  { query: "braille_signs", display: "Braille Signs" },
  { query: "elevator", display: "Elevator" },
];

const FilterPanel = () => {
  const checkboxes = FILTERS.map((filter) => (
    <FormControlLabel
      control={<Checkbox onChange={() => {}} name={filter.query} />}
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
