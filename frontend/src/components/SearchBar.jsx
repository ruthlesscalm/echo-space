import { useState } from "react";
import SearchIcon from "./icons/SearchIcon";

const SearchBar = ({
  formClassName = "gap-2 px-5 py-2",
  inputClassName = "text-xl",
  buttonClassName = "w-6 h-6",
}) => {
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
      className={`flex items-center bg-slate-700 border border-slate-500 focus-within:border-slate-400 focus-within:ring focus-within:ring-slate-400 rounded-full ${formClassName}`}
    >
      <input
        type="text"
        name="search"
        value={searchInput}
        onChange={handleSearchInputChange}
        className={`focus:outline-none focus-visible:outline-none ${inputClassName}`}
      />
      <button type="submit" className="focus:o">
        <SearchIcon
          className={`text-gray-300 hover:text-white transition-colors cursor-pointer ${buttonClassName}`}
        />
      </button>
    </form>
  );
};

export default SearchBar;
