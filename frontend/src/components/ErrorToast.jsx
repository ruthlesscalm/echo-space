import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalState";

const ErrorToast = () => {
  const { message, setMessage } = useContext(GlobalContext);
  return (
    <div
      className={`rounded-md bg-yellow-700/30 text-yellow-300 text-md px-3 py-2 text-center ${message ? "block" : "hidden"}`}
      role="alert"
    >
      {message ? `⚠️ ${message}` : ""}
    </div>
  );
};

export default ErrorToast;
