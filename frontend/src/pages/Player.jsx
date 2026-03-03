import { useEffect, useState } from "react";

const Player = () => {
  const [temp, setTemp] = useState("");
  useEffect(() => {
    (async function () {
      const res = await fetch("http://localhost:5000/api/auth/admin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resObj = await res.json();
      console.log(resObj);
      setTemp(resObj.message || resObj.page);
    })();
  }, []);
  return (
    <div>
      PLayer page
      {temp}
    </div>
  );
};

export default Player;
