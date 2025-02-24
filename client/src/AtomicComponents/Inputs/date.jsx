import { useState } from "react";
import { TextField } from "@mui/material";

export default function DatePickerAtom({
  label = "Select Date",
  defaultValue,
  onChange,
}) {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (event) => {
    const newDate = event.target.value;
    setValue(newDate);
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <div className="mt-4 mr-330">
      <TextField
        label={label}
        type="date"
        InputLabelProps={{ shrink: true }}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

// how to useeee:
// <DatePickerAtom
//   label="Birthdate"
//   defaultValue="2024-01-01"
//   onChange={(date) => console.log("Selected Date:", date)}
// />
