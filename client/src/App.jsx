import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { InputField } from "./AtomicComponents/Inputs/Input";
import UserTable from "./MoleculesComponents/Table";
import {
  ImageUploadButton,
  PrimaryButton,
  OutlinedButton,
  CustomOutlinedButton,
  ApplyButton,
  AddButton,
} from "./AtomicComponents/Buttons/Buttons";
import { WidthFull } from "@mui/icons-material";
import { SearchBar } from "./AtomicComponents/Inputs/Searchbar";
import SetDate from "./AtomicComponents/Inputs/date";
import { Box } from "@mui/material";
import Usercard from "./AtomicComponents/Cards/Usercard";

//Route imports
import MyOrders from "./UserdashboardFeature/pages/MyOrders";
import RMAsupport from "./UserdashboardFeature/pages/RMAsupport";
import OrderHistory from "./UserdashboardFeature/pages/OrderHistory";
import UserProfile from "./UserdashboardFeature/pages/UserProfile";
import SavedBuilds from "./UserdashboardFeature/pages/SavedBuilds";
import Settings from "./UserdashboardFeature/pages/Settings";
import Login from "./Login/Login";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>
      <>
        <Routes>
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/rmaSupport" element={<RMAsupport />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/savedBuilds" element={<SavedBuilds />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" exact component={Home} /> */}
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
