import { createContext, useState } from "react";

const GlobalContext = createContext(undefined);

const GlobalState = ({ children }) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  return (
    <GlobalContext.Provider value={{ displaySidebar, setDisplaySidebar }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext };
export default GlobalState;
