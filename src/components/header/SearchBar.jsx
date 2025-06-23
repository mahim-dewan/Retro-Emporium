import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-lg m-2">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-retro"
        placeholder="Search products..."
      />
      <FaSearch
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-retro"
        size={20}
      />
    </div>
  );
};

export default SearchBar;
