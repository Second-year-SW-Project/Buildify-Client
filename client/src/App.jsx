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
import Home from "./Home.jsx";
import Signup from "./auth/Signup.jsx"; 
import Verify from "./auth/Verify.jsx";
import Login from "./auth/Login.jsx";
import Forgetpassword from "./auth/Forgetpassword.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";
import GoogleCallbackPage from "./auth/GoogleCallBack.jsx";
import Dashboard from "./auth/Dashboard.jsx";
import Admindashboard from "./auth/admindashboard.jsx";
import UserComplaints from "./auth/userComplaints.jsx";
import AdminComplaints from "./auth/adminComplaint.jsx";
import ComplaintSubmit from "./auth/complaintSubmit.jsx";
import Usermanage from "./auth/usermanage.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verify" element={< Verify/>} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgetpassword" element={<Forgetpassword />} />
        <Route path="/auth/resetpassword" element={<ResetPassword />} />
        <Route path="/auth/dashboard" element={<Dashboard/>}/>
        <Route path="/auth/admindashboard" element={<Admindashboard/>} />
        <Route path="/auth/usercomplaint" element={<UserComplaints/>} />
        <Route path="/auth/admincomplaint" element={<AdminComplaints/>} />
        <Route path="/auth/complaintsubmit" element={<ComplaintSubmit/>} />
        <Route path="/auth/usermanage" element={<Usermanage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
