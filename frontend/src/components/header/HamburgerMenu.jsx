const HamburgerMenu = ({ displaySidebar, setDisplaySidebar }) => {
  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={() => setDisplaySidebar((prev) => !prev)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 10"
        className="w-8 h-8"
      >
        <line
          x1="0"
          y1="0"
          x2="20"
          y2="0"
          stroke="#38bdf8"
          strokeWidth="1"
          className={`${displaySidebar ? "rotate-45 origin-center -translate-x-1/6 translate-y-1/3" : ""}`}
        />
        <line
          x1="0"
          y1="5"
          x2="20"
          y2="5"
          stroke="#ffffff"
          strokeWidth="1"
          className={displaySidebar ? "opacity-0" : "opacity-100"}
        />
        <line
          x1="0"
          y1="10"
          x2="20"
          y2="10"
          stroke="#38bdf8"
          strokeWidth="1"
          className={`${displaySidebar ? "-rotate-45 origin-center -translate-x-1/6 -translate-y-1/3" : ""}`}
        />
      </svg>
    </button>
  );
};

export default HamburgerMenu;
