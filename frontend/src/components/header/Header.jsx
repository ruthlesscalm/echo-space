import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";
import LogoText from "../LogoText";
import { useState } from "react";
import SideBar from "./SideBar";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const links = [
    { label: "Home", href: "/", varient: "link" },
    { label: "About", href: "/about", varient: "link" },
    { label: "Login", href: "/login", varient: "button" },
  ];
  function setStyle(isActive, varient) {
    if (varient === "button") {
      return `text-[clamp(14px,0.3125vw+0.75rem,1.5rem)] bg-blue-700 font-bold px-[1em] py-[0.5em] rounded-md hover:bg-blue-600 transition-colors`;
    } else {
      return `relative text-[clamp(14px,0.3125vw+0.75rem,1.5rem)] ${isActive ? "text-blue-400 after:w-full" : "text-slate-300 hover:text-white hover:after:w-full"} transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all`;
    }
  }

  return (
    <header className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex justify-between px-5 py-3 items-center border-b border-slate-600 gap-8">
      <div className="max-[834px]:grow">
        <LogoText className="text-[clamp(18px,0.8vw+1rem,3rem)]" />
      </div>
      <SearchBar
        inputClassName="text-[clamp(14px,0.4vw+0.75rem,1.5rem)] w-[clamp(230px,16vw,500px)] "
        formClassName="gap-2 px-5 py-2 max-sm:hidden"
      />
      <nav className="max-[834px]:hidden">
        <ul className="flex items-center gap-10 text-xl">
          {links.map(({ label, href, varient }) => {
            return (
              <li key={label}>
                <NavLink
                  to={href}
                  className={({ isActive }) => setStyle(isActive, varient)}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="min-[834px]:hidden">
        <HamburgerMenu
          displaySidebar={displaySidebar}
          setDisplaySidebar={setDisplaySidebar}
        />
      </div>
      <SideBar
        className={`min-[834px]:hidden ${displaySidebar ? "hidden" : "hidden"}`}
      />
    </header>
  );
};

export default Header;
