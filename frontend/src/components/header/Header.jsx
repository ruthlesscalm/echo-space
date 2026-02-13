import SearchBar from "../SearchBar";
import LogoText from "../LogoText";
import HamburgerMenu from "./HamburgerMenu";
import NavMenu from "../NavMenu";

const Header = () => {
  return (
    <header className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex justify-between px-5 py-3 items-center border-b border-slate-600 gap-8">
      <div className="max-[834px]:grow">
        <LogoText className="text-[clamp(18px,0.8vw+1rem,3rem)]" />
      </div>
      <SearchBar
        inputClassName="text-[clamp(14px,0.4vw+0.75rem,1.5rem)] w-[clamp(230px,16vw,500px)] "
        formClassName="gap-2 px-5 py-2 max-sm:hidden"
      />
      <NavMenu navClassName="max-[834px]:hidden" />
      <div className="min-[834px]:hidden">
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
