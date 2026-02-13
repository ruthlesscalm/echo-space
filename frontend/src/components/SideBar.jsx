import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";

const SideBar = ({ className = "" }) => {
  return (
    <div
      className={`${className} bg-[#1b2336] absolute top-0 right-0 w-[100%]`}
    >
      <div className="sm:hidden">
        <SearchBar />
      </div>
      <NavMenu listClassName="flex-col" />
    </div>
  );
};

export default SideBar;
