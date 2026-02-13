import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/SideBar";
import { useContext } from "react";
import { GlobalContext } from "./contexts/GlobalState";

function App() {
  const { displaySidebar } = useContext(GlobalContext);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
        <Outlet />
        <SideBar
          className={`min-[834px]:hidden ${displaySidebar ? "block" : "hidden"}`}
        />
      </main>
    </div>
  );
}

export default App;
