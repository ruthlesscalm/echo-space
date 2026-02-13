import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import GlobalState from "./contexts/GlobalState";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalState>
      <RouterProvider router={router} />
    </GlobalState>
  </StrictMode>,
);
