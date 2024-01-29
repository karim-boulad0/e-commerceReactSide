import Cookie from "cookie-universal";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import Spinner from "../../../Components/Global/Spinner";
import { Axios } from "../../../Api/Axios";
import ForBiden from "../../../Components/Dashboard/403";

export default function RequireAuth({ AllowedRole }) {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [user, setUser] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    Axios.get(USER)
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        nav("/login");
      });
  }, [nav]);
  return token ? (
    user === "" ? (
      <Spinner />
    ) : AllowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <ForBiden
        role={user.role === "1996" ? "/dashboard/writer" : "/"}
        page={user.role === "1996" ? "Writer" : "Home"}
      />
    )
  ) : (
    <Navigate to="/login" />
  );
}
