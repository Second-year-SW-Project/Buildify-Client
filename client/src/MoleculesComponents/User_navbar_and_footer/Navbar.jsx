import { useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { HelpOutline, ShoppingCart, AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Usersearchbar from "./Usersearchbar";


export default function Navbar() {

  const cartItems = useSelector(state => state.cart?.cartItems) || [];




  const [openDropdown, setOpenDropdown] = useState(null);

  // Close dropdown when clicking outside


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };


    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navigate = useNavigate();




  return (
    <nav className="w-full h-[175px] bg-[#1a1c1e] text-white flex flex-col items-center relative z-50">
      {/* logo+searchbar+button */}
      <div className="w-full max-w-8xl flex justify-between items-center pb-2">
        {/* Logo */}

        <div className="flex-shrink-0 mt-[16px] ml-[-10px] mr-[75px]">
          <Link to="/home">
            <img src="../../../../src/assets/images/Logos/logo-gray.png" alt="Logo" />
          </Link>
        </div>

        {/* Search Bar */}

        <div className="w-full sm:mr-[130px] mt-[12px]  flex items-center ml-[50px]">
          <Usersearchbar></Usersearchbar>

          {/* Icons */}

          <div className=" absolute right-[90px] top-1/2 -mt-5  transform -translate-y-1/2 flex space-x-9">
            <Link to="#">
              <HelpOutline
                fontSize="medium"
                className="cursor-pointer hover:text-blue-400"
              />
            </Link>
            <Link to="/cartpage">
              <ShoppingCart
                fontSize="medium"
                className="cursor-pointer hover:text-blue-400"
              />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 right-12 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Profile Dropdown start.............. --copy this entire part */}
            <div className="dropdown-container">
              <AccountCircle
                fontSize="medium"
                className="cursor-pointer hover:text-blue-400"
                onClick={() =>
                  setOpenDropdown(openDropdown === "profile" ? null : "profile")
                }
              />
              {openDropdown === "profile" && (
                <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
                  <a href="http://localhost:5173/user/profile" className="block px-4 py-2 hover:bg-blue-400">
                    Profile
                  </a>
                  <a href="http://localhost:5173/adminpanel/auth/signup" className="block px-4 py-2 hover:bg-blue-400">
                    Login
                  </a>

                  {/* <Link to="/loginpage" className="block px-4 py-2 hover:bg-blue-400">
                    Profile
                  </Link>
                  <Link to="/auth/signup" className="block px-4 py-2 hover:bg-blue-400">
                    Login
                  </Link> */}


                </div>
              )}
            </div>

            {/* Profile Dropdown end.................. --copy this entire part */}
          </div>
        </div>
      </div>

      {/* Bottom Categories */}

      <div className="w-full max-w-[1350px] flex justify-around text-sm font-medium pb-[10px] space-x-6 sm:space-x-4">
        <Link to="/home" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="#" className="hover:text-blue-400">
          Custom Build
        </Link>
        <Link to="/productcategorypage/prebuild" className="hover:text-blue-400">
          Pre Build
        </Link>
        <Link to="/productcategorypage/laptop" className="hover:text-blue-400">
          Laptops
        </Link>

        {/* Components Dropdown */}

        <div className="relative dropdown-container">
          <button
            onClick={() =>
              setOpenDropdown(
                openDropdown === "components" ? null : "components"
              )
            }
            className="hover:text-blue-400"
          >
            Components
          </button>

          {openDropdown === "components" && (
            <div className="absolute left-0 w-44 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
              <Link
                to="/productcategorypage/gpu"
                className="block px-4 py-2 hover:bg-blue-400"
                onClick={() => setOpenDropdown(null)}   // Close dropdown on click
              >
                Graphic Cards
              </Link>
              <Link
                to="/productcategorypage/ram"
                className="block px-4 py-2 hover:bg-blue-400"
                onClick={() => setOpenDropdown(null)}
              >

                RAM
              </Link>
              <Link
                to="/productcategorypage/processor"
                className="block px-4 py-2 hover:bg-blue-400"
                onClick={() => setOpenDropdown(null)}       // Close dropdown on click
              >
                Processors
              </Link>
              <Link
                to="/productcategorypage/motherboard"
                className="block px-4 py-2 hover:bg-blue-400"
                onClick={() => setOpenDropdown(null)}       // Close dropdown on click

              >
                MotherBoard
              </Link>
              <Link
                to="/productcategorypage/power"
                className="block px-4 py-2 hover:bg-blue-400"
                onClick={() => setOpenDropdown(null)}       // Close dropdown on click
              >
                Power Supply
              </Link>
              <Link
                to="/productcategorypage/storage"
                className="block px-4 py-2 hover:bg-blue-400"
                onClick={() => setOpenDropdown(null)}       // Close dropdown on click
              >
                Storage
              </Link>
              <Link
                to="/productcategorypage/casing"
                className="block px-4 py-2 hover:bg-blue-400"
                onClick={() => setOpenDropdown(null)}       // Close dropdown on click
              >
                Casing
              </Link>
            </div>
          )}
        </div>

        {/* Peripherals Dropdown */}

        <div className="relative dropdown-container">
          <button
            onClick={() =>
              setOpenDropdown(
                openDropdown === "peripherals" ? null : "peripherals"
              )
            }
            className="hover:text-blue-400"
          >
            Peripherals
          </button>

          {openDropdown === "peripherals" && (
            <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
              <Link to="#" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)} >
                Mice
              </Link>
              <Link to="#" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)} >
                Keyboards
              </Link>
              <Link to="#" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)} >
                Monitors
              </Link>
            </div>
          )}
        </div>

        {/* Contact Us Dropdown */}

        <div className="relative dropdown-container">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "contact" ? null : "contact")
            }
            className="hover:text-blue-400"
          >
            Contact Us
          </button>

          {openDropdown === "contact" && (
            <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
              <Link to="#" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)} >
                Email Us
              </Link>
              <Link to="#" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)} >
                Call Us
              </Link>
              <Link to="#" className="block px-4 py-2 hover:bg-blue-400" onClick={() => setOpenDropdown(null)} >
                Support
              </Link>
            </div>
          )}
        </div>

        <Link to="/about" className="hover:text-blue-400">
          About Us
        </Link>
      </div>
    </nav>
  );
}
