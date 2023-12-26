import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Axios } from "../../../Api/Axios";

export default function Header() {
  const [settings, setSettings] = useState(false);
  const [isGet, setIsGet] = useState(false);
  useEffect(() => {
    Axios.get("/settings/index")
      .then((data) => {
        setSettings(data.data);
        setIsGet(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex ">
        <div> <Link className="navbar-brand" to="/index/homePage">
          <img
            src={isGet && settings.logo}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "2px",
            }}
            alt="none"
          />
        </Link>
        </div>
        <div>
          <div className="d-flex">
            <div className="mt-1 me-2">
              <Link className="nav-link btn btn-primary p-2" to="/index/homePage">
                Home
              </Link>
            </div>
            <Link className="btn btn-primary me-3" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary register-button" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
