import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../context/WindowContext";
import { Menu } from "../../context/MenuContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { faDrupal } from "@fortawesome/free-brands-svg-icons";
import moment from "moment";
import { NavDropdown } from "react-bootstrap";

export default function TopBar({ setting }) {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;

  const [user, setUser] = useState("");
  const userName = user.name;
  const windowSize = useContext(WindowSize);
  const Size = windowSize.windowWidth;
  const [isGet, setIsGet] = useState(false);
  const [IsAction, setIsAction] = useState(0);

  const nav = useNavigate();
  const [settings, setSettings] = useState();
  const [isGetSettings, setIsGetSettings] = useState();



  // get user auth
  useEffect(() => {
    Axios.get("/dashboard" + USER)
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // get settings
  useEffect(() => {
    Axios.get("/dashboard/settings/index")
      .then((data) => {
        setSettings(data.data);
        setIsGetSettings(true);
      })
      .catch((err) => console.log(err));
  }, [setting]);


  function handleProf() {
    nav(`/dashboard/userProfile`);
  }

  // JSX for the entire component
  return (
    <div
      className="top-bar shadow-sm d-flex align-items-center justify-content-between"
      style={{ width: Size < 400 ? "390px" : "100%" }}
    >
      <div className="d-flex align-items-center">
        <h3 className="me-4">
          <Link className=" E-Commerce" to="/NavBar/SecondHomePage">
            <img
              src={isGetSettings && settings.logo}
              style={{
                width: Size > 400 ? "50px" : "30px",
                height: Size > 400 ? "50px" : "30px",
                borderRadius: "2px",
              }}
              alt="none"
            />
          </Link>
        </h3>

        <FontAwesomeIcon
          cursor={"pointer"}
          onClick={() => setIsOpen((prev) => !prev)}
          icon={faBars}
          className="ms-4"
        />
      </div>

      <div className="text-center d-flex align-items-center gap-4">
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              style={{
                padding: "0.5rem",
                textDecoration: "none",
                position: "relative",
              }}
            >
              <FontAwesomeIcon
                icon={faBell}
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: "black",
                  position: "absolute",
                  top: "0",
                  right: "0",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  padding: "2px 6px",
                }}
              >
              </span>
            </Dropdown.Toggle>

            {isGet ? (
              <Dropdown.Menu style={{ fontSize: "12px", padding: 0 }}>
                <div className="d-flex justify-content-center">
                  <Dropdown.Item className="bg-secondary text-white w-100 ">
                    <div
                      cursor={"pointer"}
                      className="bg-secondary text-white w-100"
                    >
                      Mark all as read
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="bg-black text-white w-100 ">
                    <div
                      cursor={"pointer"}
                      onClick={() => setIsAction((prev) => prev + 1)}
                      className="bg-black text-white w-100"
                    >
                      Refresh
                    </div>
                  </Dropdown.Item>
                </div>
                <Dropdown.Item className="bg-secondary w-100 ">
                  <NavLink
                    className="bg-secondary  text-white   w-100"
                  >
                    See All Notifications
                  </NavLink>
                </Dropdown.Item>
              </Dropdown.Menu>
            ) : null}
          </Dropdown>
        </div>
        <NavDropdown
          title={<FontAwesomeIcon icon={faUser} className="fs-6" />}
          className="pt-2 mb-2  text-primary"
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item>
            <div>{userName}</div>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <div onClick={handleProf} className="list-down">
              My Account
            </div>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <div className="" onClick={() => nav("/logout")}>
              Logout
            </div>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
}
