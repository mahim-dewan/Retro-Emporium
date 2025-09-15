"use client";
import React, { useState } from "react";

const filterItems = ["All", "Pending", "Delivered", "Canceled", "Rejected"];

const MyOrderFilter = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleActiveFilter = (item) => {
    setActiveFilter(item);
  };

  return (
    <div>
      <p className="text-xl font-semibold px-4">Filtered By</p>
      <ul className="flex items-center flex-wrap gap-2 max-w-[600px] p-4">
        {filterItems.map((item) => (
          <li
            key={item}
            onClick={() => handleActiveFilter(item)}
            className={`border border-retro rounded-3xl w-fit px-2 py-1 cursor-pointer  ${
              item === activeFilter
                ? " bg-retro text-white"
                : " hover:bg-retro hover:text-white"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrderFilter;
