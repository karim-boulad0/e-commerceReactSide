import React, { useEffect, useState } from "react";
import { LOGOUT } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import Spinner from "../../../Components/Global/Spinner";

export default function Logout() {
  const nav = useNavigate();
  const cookie = Cookie();
  const [logoutComplete, setLogoutComplete] = useState(false);

  useEffect(() => {
    async function handleLogout() {
      try {
        await Axios.get(LOGOUT).then(() => {
          // remove cookie after logout
          cookie.remove("e-commerce");
          // set logout status to true
          setLogoutComplete(true);
          // navigate to login after a short delay (optional)
          setTimeout(() => {
            nav("/login");
          }, 1000);
        });
      } catch (err) {
        nav("/login");
        console.log(err);
      }
    }

    // call handleLogout when the component mounts
    handleLogout();
  }, [cookie, nav]);

  // render the spinner until logout is complete
  return logoutComplete ? null : <Spinner />;
}
