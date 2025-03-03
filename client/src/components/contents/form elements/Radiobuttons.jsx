import { useState } from "react";
import { Radio, FormControl, FormControlLabel, RadioGroup } from "@mui/material";

export default function Radiobuttons({ options = [], defaultValue = "", onChange }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl>
      <RadioGroup value={selectedValue} onChange={handleChange}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={
              <Radio
                disableRipple
                sx={{
                  "&:hover": { backgroundColor: "transparent" },
                  "&.Mui-focusVisible": { outline: "none" }, 
                  "&.Mui-checked": { transform: "none" }, 
                }}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

// how  to use:
// <RadioButtonAtom 
//   options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]} 
//   defaultValue="male"
//   onChange={(value) => console.log("Selected:", value)}
// />
