import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");    //query that go to backend
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`); // Redirects to Search Results Page
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <form onSubmit={handleSearch} className="relative flex w-full">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 pl-4 text-black rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20 text-sm sm:text-base"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-600 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-white hover:bg-blue-500 transition duration-200 text-sm sm:text-base"
        >
          Search
        </button>
      </form>
    </div>
  );
}
