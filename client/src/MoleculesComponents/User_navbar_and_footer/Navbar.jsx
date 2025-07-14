import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { HelpOutline, ShoppingCart, AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Usersearchbar from "./Usersearchbar";
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import PowerIcon from '@mui/icons-material/Power';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DevicesIcon from '@mui/icons-material/Devices';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SdStorageIcon from '@mui/icons-material/SdStorage';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import StraightenIcon from '@mui/icons-material/Straighten';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import InboxIcon from '@mui/icons-material/Inbox';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import MonitorIcon from '@mui/icons-material/Monitor';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import QuizIcon from '@mui/icons-material/Quiz';
import HelpIcon from '@mui/icons-material/Help';
import Swal from "sweetalert2";


export default function Navbar() {
  const cartItems = useSelector(state => state.cart?.cartItems) || [];
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Fetch logged-in user details
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const users = response.data;
        const user = users.find(u => u._id === userId);
        if (user) setCurrentUser(user);
      } catch (err) {
        console.error("Error fetching user in Navbar:", err);
      }
    };

    fetchUser();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="w-full h-[175px] bg-[#1a1c1e] text-white flex flex-col items-center relative z-50">
      {/* logo+searchbar+button */}
      <div className="w-full max-w-8xl flex justify-between items-center pb-2">
        {/* Logo */}
        <div className="flex-shrink-0 mt-[16px] ml-[-10px] mr-[75px]">
          <Link to="/home">
            <img src="https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421085/logo_wfxxqe.png" alt="Logo" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:mr-[130px] mt-[12px] flex items-center ml-[50px]">
          <Usersearchbar />

          {/* Icons */}
          <div className="absolute right-[90px] top-1/2 -mt-5 transform -translate-y-1/2 flex space-x-9">
            <Link to="#">
              <HelpOutline fontSize="medium" className="cursor-pointer hover:text-blue-400" />
            </Link>
            <Link to="/cartpage">
              <ShoppingCart fontSize="medium" className="cursor-pointer hover:text-blue-400" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 right-12 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Profile Dropdown start */}
            <div className="dropdown-container">
              {currentUser?.profilePicture ? (
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400"
                  onClick={() => setOpenDropdown(openDropdown === "profile" ? null : "profile")}
                />
              ) : (
                <AccountCircle
                  fontSize="medium"
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() => setOpenDropdown(openDropdown === "profile" ? null : "profile")}
                />
              )}






{/* {openDropdown === "profile" && (
  <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
    <a href="http://localhost:5173/user/profile" className="block px-4 py-2 hover:bg-blue-400">
      Profile
    </a>
    {currentUser ? (
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);
          setOpenDropdown(null);
          navigate("/home");
        }}
        className="text-left px-4 py-2 hover:bg-blue-400"
      >
        Logout
      </button>
    ) : (
      <a href="http://localhost:5173/adminpanel/auth/login" className="block px-4 py-2 hover:bg-blue-400">
        Login
      </a>
    )}
  </div>
)} */}


{openDropdown === "profile" && (
  <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
    {currentUser ? (
      <>
        <Link
          to="/user/profile"
          className="block px-4 py-2 hover:bg-blue-400"
          onClick={() => setOpenDropdown(null)}
        >
          Profile
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            setCurrentUser(null);
            setOpenDropdown(null);
            navigate("/home");
          }}
          className="block text-left px-4 py-2 hover:bg-blue-400 w-full"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <button
          onClick={() => {
            //alert("You're not logged in");
                             Swal.fire({
                   title: "",
                   text: "Please log in to the site to continue..",
                   icon: 'warning',
                   confirmButtonText: "OK",
                 }).then(() => {
                   
                   navigate("/adminpanel/auth/login");
                 });
            setOpenDropdown(null);
            //navigate("/adminpanel/auth/login");
          }}
          className="block text-left px-4 py-2 hover:bg-blue-400 w-full"
        >
          Profile
        </button>
        <Link
          to="/adminpanel/auth/login"
          className="block px-4 py-2 hover:bg-blue-400"
          onClick={() => setOpenDropdown(null)}
        >
          Login
        </Link>
      </>
    )}
  </div>
)}






            </div>
            {/* Profile Dropdown end */}
          </div>
        </div>
      </div>

      {/* Bottom Categories */}
      <div className="w-full max-w-[1350px] flex justify-around text-sm font-medium pb-[10px] space-x-6 sm:space-x-4">
        <Link to="/home" className="hover:text-blue-400">Home</Link>
        <Link to="/modeselect" className="hover:text-blue-400">Custom Build</Link>
        <Link to="/productcategorypage/prebuild" className="hover:text-blue-400">Pre Build</Link>
        <Link to="/productcategorypage/laptop" className="hover:text-blue-400">Laptops</Link>

        {/* Components Dropdown */}
        <div className="relative dropdown-container">
          <button onClick={() => setOpenDropdown(openDropdown === "components" ? null : "components")} className="hover:text-blue-400">
            Components
          </button>
          {openDropdown === "components" && (
            <div className="absolute left-0 w-48 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2 space-y-1">
              <Link to="/productcategorypage/gpu" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <GraphicEqIcon fontSize="small" className="mr-2" /> Graphic Cards
              </Link>
              <Link to="/productcategorypage/ram" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <StraightenIcon fontSize="small" className="mr-2" /> RAM
              </Link>
              <Link to="/productcategorypage/processor" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <MemoryIcon fontSize="small" className="mr-2" /> Processors
              </Link>
              <Link to="/productcategorypage/motherboard" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <DeveloperBoardIcon fontSize="small" className="mr-2" /> MotherBoard
              </Link>
              <Link to="/productcategorypage/power" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <PowerSettingsNewIcon fontSize="small" className="mr-2" /> Power Supply
              </Link>
              <Link to="/productcategorypage/storage" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <StorageIcon fontSize="small" className="mr-2" /> Storage
              </Link>
              <Link to="/productcategorypage/casing" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <InboxIcon fontSize="small" className="mr-2" /> Casing
              </Link>
            </div>
          )}
        </div>

        {/* Peripherals Dropdown */}
        <div className="relative dropdown-container">
          <button onClick={() => setOpenDropdown(openDropdown === "peripherals" ? null : "peripherals")} className="hover:text-blue-400">
            Peripherals
          </button>
          {openDropdown === "peripherals" && (
            <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
              <Link to="/productcategorypage/expansion_network" className="block px-4 py-3 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <EarbudsIcon fontSize="small" className="mr-2" /> Expansions
              </Link>
              <Link to="/productcategorypage/monitor" className="block px-4 py-3 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <MonitorIcon fontSize="small" className="mr-2" /> Monitors
              </Link>
            </div>
          )}
        </div>

        {/* Contact Us Dropdown */}
        <div className="relative dropdown-container">
          <button onClick={() => setOpenDropdown(openDropdown === "contact" ? null : "contact")} className="hover:text-blue-400">
            Contact Us
          </button>
          {openDropdown === "contact" && (
            <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
              <Link to="#" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <MailOutlineIcon fontSize="small" className="mr-2" /> Email Us
              </Link>
              <Link to="#" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <CallIcon fontSize="small" className="mr-2" /> Call Us
              </Link>
              <Link to="#" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)}>
                <QuizIcon fontSize="small" className="mr-2" /> Support
              </Link>
            </div>
          )}
        </div>

        <Link to="/about" className="hover:text-blue-400">About Us</Link>
      </div>
    </nav>
  );
}
