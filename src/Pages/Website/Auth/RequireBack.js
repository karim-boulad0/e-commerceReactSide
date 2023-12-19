import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Axios } from "../../../Api/Axios";

export default function RequireBack() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [isAuth, setIsAuth] = useState();
  const [IsNotAuth, setIsNotAuth] = useState();
  const [isFinished, setIsFinished] = useState();
  useEffect(() => {
    Axios.get("/isAuthExist")
      .then((data) => {
        setIsAuth(data.data);
        setIsFinished(true);
      })
      .catch((err) => { console.log(err); setIsNotAuth(401) });
  }, []);
  // get the last location (pathname)
  return (token && isAuth) ? window.history.back() : (isFinished || IsNotAuth === 401) && <Outlet />;
}
