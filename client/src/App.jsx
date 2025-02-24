import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { InputField } from "./AtomicComponents/Inputs/Input";
import UserTable from "./AtomicComponents/Table";
import { ImageUploadButton, PrimaryButton, OutlinedButton, CustomOutlinedButton, ApplyButton, AddButton } from "./AtomicComponents/Buttons/Buttons";
import { WidthFull } from "@mui/icons-material";
import { SearchBar } from "./AtomicComponents/Inputs/Searchbar";
import SetDate from "./AtomicComponents/Inputs/date";

function App() {
  // const [count, setCount] = useState(0);
  return (
    <Router>
      <>
        <Routes>
          {/* <Route path="/" exact component={Home} /> */}
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
