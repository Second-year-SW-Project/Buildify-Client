import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function SetDate({ width, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        sx={{
          minWidth: { width },
          "& .MuiInputBase-root": {
            "& fieldset": {
              borderWidth: 1, // Default border color
              borderRadius: 1,
            },
          }
        }}
      />
    </LocalizationProvider>
  );
}

//How to use
//<SetDate width={300} label="Select Date" />
