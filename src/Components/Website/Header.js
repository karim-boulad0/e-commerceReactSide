import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrupal } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import { Axios } from "../../Api/Axios";

export default function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
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
      <div className="container-fluid">
        <Link className="navbar-brand" to="/navbar/homePage">
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

        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end ${collapsed ? "show" : ""
            }`}
        >
          <ul className="navbar-nav me-5 ">
            <li className="nav-item">
              <Link
                className="nav-link "
                aria-current="page"
                to="/navbar/homePage"
                onClick={() => setCollapsed(false)}
              >
                Home
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link className="btn btn-primary me-3" to="/login">
              Login
            </Link>
            <Link
              className="btn btn-primary me-2 register-button"
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
