import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
