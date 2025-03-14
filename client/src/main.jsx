import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import './index.css';


import { AccountCircle } from "@mui/icons-material";

import Home from "./pages/Home/Home.jsx";
import About from "./pages/About_page/About.jsx";
import Login_page from "./pages/Login_page/Login_page.jsx";
import Productcategorypage from "./pages/Producat_category/Productcategorypage.jsx";
import Itempage from "./pages/Single_Item/Itempage.jsx";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/home" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/loginpage" element={<Login_page />} />

      <Route path="/productcategorypage" element={<Productcategorypage />} />

      <Route path="/itempage" element={<Itempage />} />

      


    </Routes>
  </BrowserRouter>
);