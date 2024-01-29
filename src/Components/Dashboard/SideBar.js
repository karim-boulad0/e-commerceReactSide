import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/SideBar.css";

import { NavLink } from "react-router-dom";
import { Menu } from "../../context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../context/WindowContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { NavLinks } from "./NavLink";
export default function SideBar() {
  const windowSize = useContext(WindowSize);
  const Size = windowSize.windowWidth;
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const [user, setUser] = useState("");

  // get user that had auth
  useEffect(() => {
    Axios.get("/dashboard" + USER)
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const showNavLinks = NavLinks.map((nav, key) => {
    if (nav.role.includes(user.role)) {
      return (
        <NavLink
          key={key}
          to={nav.to}
          className="d-flex align-items-center gap-2 side-bar-link  side-item"
          // style={{ borderBottom: "2px solid black" }}
        >
          <FontAwesomeIcon
            className="text-primary"
            icon={nav.icon}
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 4px" }}
          />
          <p
            className="m-0 side-bar-link"
            style={{ display: isOpen ? "block" : "none" }}
          >
            {nav.name}
          </p>
        </NavLink>
      );
    } else {
      return null; // Return null for cases where the condition is not met
    }
  });
  return (
    <div
      className="side-bar shadow-sm pt-3"
      style={{
        width: isOpen ? "170px" : "fit-content",
        display: Size < 600 && !isOpen ? "none" : " ",
      }}
    >
      {showNavLinks}
    </div>
  );
}
