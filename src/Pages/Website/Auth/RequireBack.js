import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Axios } from "../../../Api/Axios";

export default function RequireBack() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    Axios.get("/isAuthExist")
      .then((data) => setIsAuth(data.data))
      .catch((err) => console.log(err));
  },[]);
  // get the last location (pathname)
  return token && isAuth ? window.history.back() : <Outlet />;
}
