import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`); // Redirects to Search Results Page
    }
  };
  return (
    <div className="ml-[-150px] flex items-center justify-center w-full p-4">
      <form onSubmit={handleSearch} className="relative flex w-full max-w-2xl">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-[10px] pl-4 text-black rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:pr-20"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="absolute -mr-1 right-1 top-1/2 transform -translate-y-1/2 bg-purple-600 px-6 py-2 rounded-full text-white hover:bg-blue-500 transition duration-200 sm:right-2"
        >
          Search
        </button>
      </form>
    </div>
  );
}
