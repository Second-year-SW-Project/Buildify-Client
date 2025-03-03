import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CheckboxAtom({ label = "Checkbox", defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <FormControlLabel 
      control={
        <Checkbox 
          checked={checked} 
          onChange={handleChange} 
          disableRipple
        />
      } 
      label={label} 
    />
  );
}

// how to useeeeee:
// <CheckboxAtom label="thamoj" defaultChecked={false} onChange={(checked) => console.log("Checked:", checked)} />
