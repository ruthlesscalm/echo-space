import { Outlet } from "react-router-dom";
import LogoText from "../components/LogoText";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="px-10 py-7">
        <LogoText className="text-4xl" />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
