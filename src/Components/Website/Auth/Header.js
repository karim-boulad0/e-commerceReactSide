import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import "./Header.css";

export default function Header() {
  const [settings, setSettings] = useState(null);
  const [isGet, setIsGet] = useState(false);
  const location = useLocation();

  const fetchSettings = () => {
    Axios.get("/settings/index")
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsGet(true));
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const renderLogo = () => {
    if (isGet && settings && settings.logo) {
      return (
        <Link className="navbar-brand" to="/index/homePage">
          <img src={settings.logo} alt="none" className="logo" />
        </Link>
      );
    }
    // You can add a placeholder or loading state if the logo is not available yet
    return null;
  };

  const renderLinks = () => (
    <div className="links">
      <Link
        to="/index/homePage"
        className={
          location.pathname === "/index/homePage"
            ? "nav-link active"
            : "nav-link"
        }
      >
        Home
      </Link>
      <Link
        to="/login"
        className={
          location.pathname === "/login" ? "nav-link active" : "nav-link"
        }
      >
        Login
      </Link>
      <Link
        to="/register"
        className={
          location.pathname === "/register" ? "nav-link active" : "nav-link"
        }
      >
        Register
      </Link>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex">
        <div>{renderLogo()}</div>
        <div>{renderLinks()}</div>
      </div>
    </nav>
  );
}
