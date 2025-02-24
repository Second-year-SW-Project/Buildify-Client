import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar({ placeholder, width, fontSize }) {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Optionally, implement a search function here
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleSearchChange}

      sx={{
        "& .MuiInputBase-root": {
          "& fieldset": {
            borderWidth: 2,
            borderRadius: 2,
          },
          width: width,
          fontSize: fontSize,
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    //   fullWidth
    />
  );
};
