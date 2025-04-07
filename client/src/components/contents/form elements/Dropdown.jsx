import { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function Dropdown({ label = "Select an option", options = [], defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel className="">{label}</InputLabel>
      <Select className="mt-3"
        value={value}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": { transition: "none" }, 
            },
          },
        }}
        sx={{
          "& .MuiSelect-icon": { transition: "none" }, 
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

// how to uussee:
// <SelectAtom 
//   label="Category" 
//   options={[{ label: "GPU", value: "gpu" }, { label: "CPU", value: "cpu" }]} 
//   defaultValue="gpu" 
//   onChange={(value) => console.log("Selected:", value)} 
// />
