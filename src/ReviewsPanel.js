import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
} from "@material-ui/core";
import { useState } from "react";
import { FILTERS } from "./FilterPanel";
import { getBaseURL } from "./utils";
const ReviewsPanel = ({ location, onClose }) => {
  const [update, setUpdate] = useState([]);
  if (location == null || location == undefined) {
    return null;
  }
  const { accessibleWith, partiallyAccessibleWith } = location.assist_type;
  const accessible_traits = {};
  for (let i = 0; i < FILTERS.length; i++) {
    let filter = FILTERS[i];
    if (accessibleWith[filter.query] === true) {
      accessible_traits[filter.query] = "FULL";
    } else if (partiallyAccessibleWith[filter.query] === true) {
      accessible_traits[filter.query] = "PARTIAL";
    } else {
      accessible_traits[filter.query] = "NONE";
    }
  }
  const accessibility_display = FILTERS.map((filter) => {
    let value = "NONE";
    if (accessibleWith[filter.query]) {
      value = "FULL";
    } else if (partiallyAccessibleWith[filter.query]) {
      value = "PARTIAL";
    }
    return (
      <div key={filter.query} className="review-filter">
        <FormControl fullWidth>
          <InputLabel>{filter.display}</InputLabel>
          <Select
            onChange={(e) => {
              let prev = false;
              let newUpdate = [...update];
              for (let i = 0; i < newUpdate.length; i++) {
                if (newUpdate[i].query === filter.query) {
                  newUpdate[i].value = e.target.value;
                  prev = true;
                }
              }
              if (!prev) {
                newUpdate.push({ ...filter, value: e.target.value });
              }
              setUpdate(newUpdate);
            }}
            value={accessible_traits[filter.query]}
            fullWidth
            value={value}
          >
            <MenuItem value="FULL">Fully Accessible</MenuItem>
            <MenuItem value="PARTIAL">Partially Accessible</MenuItem>
            <MenuItem value="NONE">None</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  });

  const submit = async () => {
    const updated = { ...location };
    for (let i = 0; i < update.length; i++) {
      if (update[i].value === "FULL") {
        updated.assist_type.accessibleWith[update[i].query] = true;
        updated.assist_type.partiallyAccessibleWith[update[i].query] = false;
      } else if (update[i].value === "PARTIAL") {
        updated.assist_type.accessibleWith[update[i].query] = false;
        updated.assist_type.partiallyAccessibleWith[update[i].query] = true;
      } else {
        updated.assist_type.accessibleWith[update[i].query] = false;
        updated.assist_type.partiallyAccessibleWith[update[i].query] = false;
      }
    }
    await fetch(`${getBaseURL()}/location/reivew`, {
      method: "POST",
      body: JSON.stringify(updated),
    });
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <div className="review-panel">
        <h3>What accessibility does {location.name} have?</h3>
        {accessibility_display}
        <Button variant="contained" onClick={() => submit()}>
          Submit
        </Button>
      </div>
    </Dialog>
  );
};

export default ReviewsPanel;
