import { Outlet } from "react-router-dom";
import ErrorToast from "../components/ErrorToast";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <main>
        <ErrorToast />
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
