import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";

const Header = () => {
  const links = [
    { label: "Home", href: "/", varient: "link" },
    { label: "About", href: "/about", varient: "link" },
    { label: "Login", href: "/login", varient: "button" },
  ];
  function setStyle(isActive, varient) {
    if (varient === "button") {
      return `bg-blue-700 font-bold px-5 py-2 rounded-md hover:bg-blue-600 transition-colors`;
    } else {
      return `relative ${isActive ? "text-blue-400 after:w-full" : "text-slate-300 hover:text-white hover:after:w-full"} transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all`;
    }
  }

  return (
    <header className="bg-slate-800 text-white flex justify-between px-5 py-3 items-center">
      <div>
        <h1 className="text-3xl tracking-wide text-blue-400 font-space-grotesk font-medium">
          Echo Space
        </h1>
      </div>
      <SearchBar />
      <nav>
        <ul className="flex gap-10 text-xl">
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
    </header>
  );
};

export default Header;
