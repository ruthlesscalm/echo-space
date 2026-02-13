import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalState";

const HamburgerMenu = () => {
  const { displaySidebar, setDisplaySidebar } = useContext(GlobalContext);
  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={() => setDisplaySidebar((prev) => !prev)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 10"
        className="w-auto h-6.25 aspect-3/2"
      >
        <line
          x1="0"
          y1="0"
          x2="20"
          y2="0"
          stroke="#38bdf8"
          strokeWidth="1"
          className={`transition-transform transform-view origin-center duration-300 ease-in ${displaySidebar ? "rotate-45 -translate-x-1/6 translate-y-1/3" : ""}`}
        />
        <line
          x1="0"
          y1="5"
          x2="20"
          y2="5"
          stroke="#ffffff"
          strokeWidth="1"
          className={`transition-opacity transform-view duration-200 ease-in ${displaySidebar ? "opacity-0" : "opacity-100"}`}
        />
        <line
          x1="0"
          y1="10"
          x2="20"
          y2="10"
          stroke="#38bdf8"
          strokeWidth="1"
          className={`transition-transform transform-view origin-center duration-300 ease-in ${displaySidebar ? "-rotate-45 -translate-x-1/6 -translate-y-1/3" : ""}`}
        />
      </svg>
    </button>
  );
};

export default HamburgerMenu;
