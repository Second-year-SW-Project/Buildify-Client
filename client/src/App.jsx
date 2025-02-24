import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { InputField } from "./AtomicComponents/Inputs/Input";
import UserTable from "./AtomicComponents/Table";
import {
  ImageUploadButton,
  PrimaryButton,
  OutlinedButton,
  CustomOutlinedButton,
  ApplyButton,
  AddButton,
} from "./AtomicComponents/Buttons/Buttons";
import { WidthFull } from "@mui/icons-material";
import SearchBar from "./AtomicComponents/Inputs/Searchbar";
import { TextField } from "@mui/material";
import theme from "./AtomicComponents/theme";
import SetDate from "./AtomicComponents/Inputs/date";

function App() {
  // const [count, setCount] = useState(0);
  return (
    <Router>
      <>
        {/* Test of inputs */}
        {/* <div className="p-7">
          <InputField label="Name" variant="outlined" color="error" />
          <InputField
            type="select"
            label="choose"
            variant="outlined"
            options={[
              { value: "1", label: "Lasitha" },
              { value: "2", label: "Is" },
              { value: "3", label: "Crazy" },
            ]}
          />
          <InputField
            label="Search Input"
            type="autocomplete"
            options={[
              { label: "Apple" },
              { label: "Banana" },
              { label: "Cherry" },
            ]}
            sx={{ mb: 2 }}
          />
          <InputField label="Accept" type="checkbox" color="error" />
          <InputField
            row
            labelPlacement="bottom"
            color="primary100"
            label="Choose a Fruit"
            type="radio"
            options={[
              { label: "Apple", value: "apple" },
              { label: "Banana", value: "banana" },
              { label: "Cherry", value: "cherry" },
            ]}
          />
        </div> */}
        <Routes>
          {/* <Route path="/" exact component={Home} /> */}
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
