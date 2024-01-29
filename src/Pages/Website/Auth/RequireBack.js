import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { Axios } from "../../../Api/Axios";

export default function RequireBack() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [isAuth, setIsAuth] = useState();
  const [IsNotAuth, setIsNotAuth] = useState();
  const [isFinished, setIsFinished] = useState();
  const nav = useNavigate()
  useEffect(() => {
    Axios.get("/isAuthExist")
      .then((data) => {
        setIsAuth(data.data);
        setIsFinished(true);
      })
      .catch((err) => { console.log(err); setIsNotAuth(401) });
  }, []);
  return (token && isAuth) ? nav('/index/homePage') : (isFinished || IsNotAuth === 401) && <Outlet />;
}
