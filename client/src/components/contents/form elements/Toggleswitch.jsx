import { useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";

export default function ToggleSwitchAtom({ label = "Toggle", defaultChecked = false, onChange }) {
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
        <Switch
          checked={checked}
          onChange={handleChange}
          disableRipple
          sx={{
            "& .MuiSwitch-thumb": { transition: "none" }, // Remove thumb animation
            "& .MuiSwitch-track": { transition: "none" }, // Remove track animation
            "&:hover": { backgroundColor: "transparent" }, // Remove hover effect
          }}
        />
      }
      label={label}
    />
  );
}

// how to use:
// <ToggleSwitchAtom 
//   label="thamoj" 
//   defaultChecked={false} 
//   onChange={(checked) => console.log("Switch is:", checked)} 
// />
