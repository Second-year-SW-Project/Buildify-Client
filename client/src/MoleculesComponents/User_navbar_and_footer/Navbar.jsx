import { useState, useEffect } from "react";
import { HelpOutline, ShoppingCart, AccountCircle } from "@mui/icons-material";

export default function Navbar() {
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

  return (
    <nav className="w-full h-[175px] bg-[#1a1c1e] text-white flex flex-col items-center relative z-50">
      {/* Top Section */}
      <div className="w-full max-w-8xl flex justify-between items-center pb-2">
        {/* Logo */}
        <div className="flex-shrink-0 mt-[16px] ml-[-10px] mr-[75px]">
          <a href="#"><img src="./logo.png" alt="Logo" /></a>
        </div>
        {/* Search Bar */}
        <div className="w-full sm:mr-[130px] mt-[12px]  flex items-center ml-[50px]">
          <input
            type="text"
            placeholder="    Search Products..."
            className="w-full p-2 text-black rounded-[30px] bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500 pr-40"
          />
          <button className=" mt-10 mr-[270px] -ml-[97px]   transform -translate-y-1/2 bg-purple-600 px-6 py-2 rounded-[30px] text-white hover:bg-blue-500">
            Search
          </button>
          {/* Icons */}
          <div className=" absolute right-[90px] top-1/2 -mt-5  transform -translate-y-1/2 flex space-x-9">
            <HelpOutline fontSize="medium" className="cursor-pointer hover:text-blue-400" />
            <ShoppingCart fontSize="medium" className="cursor-pointer hover:text-blue-400" />
            <AccountCircle fontSize="medium" className="cursor-pointer hover:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Bottom Categories */}
      <div className="w-full max-w-[1350px] flex justify-around text-sm font-medium pb-[10px] space-x-6 sm:space-x-4">
        <a href="#" className="hover:text-blue-400">Home</a>
        <a href="#" className="hover:text-blue-400">Custom Build</a>
        <a href="#" className="hover:text-blue-400">Pre Build</a>
        <a href="#" className="hover:text-blue-400">Laptops</a>

        {/* Components Dropdown */}
        <div className="relative dropdown-container">
          <button
            onClick={() => setOpenDropdown(openDropdown === "components" ? null : "components")}
            className="hover:text-blue-400"
          >
            Components
          </button>
          {openDropdown === "components" && (
            <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
              <a href="#" className="block px-4 py-2 hover:bg-blue-400">Graphic Cards</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-400">RAM</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-400">Processors</a>
            </div>
          )}
        </div>

        {/* Peripherals Dropdown */}
        <div className="relative dropdown-container">
          <button
            onClick={() => setOpenDropdown(openDropdown === "peripherals" ? null : "peripherals")}
            className="hover:text-blue-400"
          >
            Peripherals
          </button>
          {openDropdown === "peripherals" && (
            <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
              <a href="#" className="block px-4 py-2 hover:bg-blue-400">Mice</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-400">Keyboards</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-400">Monitors</a>
            </div>
          )}
        </div>

        {/* Contact Us Dropdown */}
        <div className="relative dropdown-container">
          <button
            onClick={() => setOpenDropdown(openDropdown === "contact" ? null : "contact")}
            className="hover:text-blue-400"
          >
            Contact Us
          </button>
          {openDropdown === "contact" && (
            <div className="absolute left-0 w-40 bg-[#333] text-white rounded-md shadow-lg mt-1 flex flex-col py-2">
              <a href="#" className="block px-4 py-2 hover:bg-blue-400">Email Us</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-400">Call Us</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-400">Support</a>
            </div>
          )}
        </div>

        <a href="#" className="hover:text-blue-400">About Us</a>
      </div>
    </nav>
  );
}
