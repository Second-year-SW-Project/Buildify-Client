import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { InputField } from "./AtomicComponents/Inputs/Input";
import UserTable from "./MoleculesComponents/Table";
import { ImageUploadButton, PrimaryButton, OutlinedButton, CustomOutlinedButton, ApplyButton, AddButton } from "./AtomicComponents/Buttons/Buttons";
import { WidthFull } from "@mui/icons-material";
import { SearchBar } from "./AtomicComponents/Inputs/Searchbar";
import SetDate from "./AtomicComponents/Inputs/date";
import { Box } from "@mui/material";
import Usercard from "./AtomicComponents/Cards/Usercard";


function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>

      </Routes>
    </Router>
  );


}

export default App;
