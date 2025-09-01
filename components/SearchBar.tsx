import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="bg-gray-400 rounded py-1 px-1">
      <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
    </div>
  );
};

export default SearchBar;