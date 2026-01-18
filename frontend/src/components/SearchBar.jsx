import { useState } from "react";
import SearchIcon from "./icons/SearchIcon";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }
  function handleSearchFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleSearchFormSubmit}
      className="flex items-center gap-2 bg-slate-700 border border-slate-500 focus-within:border-slate-400 focus-within:ring focus-within:ring-slate-400 rounded-full px-5 py-2"
    >
      <input
        type="text"
        name="search"
        value={searchInput}
        onChange={handleSearchInputChange}
        className="text-xl focus:outline-none focus-visible:outline-none"
      />
      <button type="submit" className="focus:o">
        <SearchIcon className="w-6 h-6 text-gray-300 hover:text-white transition-colors cursor-pointer " />
      </button>
    </form>
  );
};

export default SearchBar;
