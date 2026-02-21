import { createContext, useState } from "react";

const GlobalContext = createContext(undefined);

const GlobalState = ({ children }) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [isLoginned, setIsLoginned] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        displaySidebar,
        setDisplaySidebar,
        isLoginned,
        setIsLoginned,
        message,
        setMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext };
export default GlobalState;
