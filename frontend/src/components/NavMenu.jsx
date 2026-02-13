import { NavLink } from "react-router-dom";

const NavMenu = ({ navClassName = "", listClassName = "" }) => {
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
    <nav className={navClassName}>
      <ul className={`flex items-center gap-10 text-xl ${listClassName}`}>
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
  );
};

export default NavMenu;
