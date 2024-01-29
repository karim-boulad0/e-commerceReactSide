import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Dropdown,
  FormControl,
  InputGroup,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import moment from "moment/moment";
import { Axios } from "../../../Api/Axios";
import {
  faBell,
  faCartPlus,
  faRightFromBracket,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import "./css/TopBar.css";
import { faDashcube, faJediOrder } from "@fortawesome/free-brands-svg-icons";

export default function TopNavBar() {
  const [query, setQuery] = useState("");

  // State variables
  const [categories, setCategories] = useState([]);
  const [isAuthExist, setIsAuthExist] = useState(false);
  const [isGet, setIsGet] = useState(false);
  const [IsAction, setIsAction] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [countUnreadNotifications, setCountUnreadNotifications] =
    useState(false);
  const [settings, setSettings] = useState([]);
  const [isGetSettings, setIsGetSettings] = useState([]);

  // useEffect to check if user is authenticated
  useEffect(() => {
    Axios.get("/webSite/isAuthExist")
      .then((data) => setIsAuthExist(data.data))
      .catch((err) => console.error(err));
  }, []);
  // useEffect to fetch categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `/webSite/categories?filter[item]=${query}`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [query]);
  // useEffect to fetch settings
  useEffect(() => {
    Axios.get("/settings/index")
      .then((data) => {
        setSettings(data.data);
        setIsGetSettings(true);
      })
      .catch((err) => console.error(err));
  }, []);
  // useEffect to fetch notifications
  useEffect(() => {
    Axios.get("/client/notification/all")
      .then((data) => {
        setIsGet(true);
        const notificationsArray = Object.values(data.data.notifications || {});
        setNotifications(notificationsArray);
      })
      .catch((err) => console.error(err));
  }, [IsAction]);
  // useEffect to count unread notifications
  useEffect(() => {
    Axios.get("/client/notification/countUnreadNotifications")
      .then((data) => setCountUnreadNotifications(data.data))
      .catch((err) => console.error(err));
  }, [IsAction]);
  // Function to format time ago
  const formatTimeAgo = (timestamp) => {
    const now = moment();
    const notificationTime = moment(timestamp);
    const weeksAgo = now.diff(notificationTime, "weeks");
    const daysAgo = now.diff(notificationTime, "days");
    const hoursAgo = now.diff(notificationTime, "hours");
    const minutesAgo = now.diff(notificationTime, "minutes");

    if (weeksAgo > 0) {
      return ` ${weeksAgo} ${weeksAgo === 1 ? "w" : "w"}`;
    } else if (daysAgo > 0) {
      return ` ${daysAgo} ${daysAgo === 1 ? "d" : "d"}`;
    } else if (hoursAgo > 0) {
      return ` ${hoursAgo} ${hoursAgo === 1 ? "h" : "h"}`;
    } else if (minutesAgo > 0) {
      return ` ${minutesAgo} ${minutesAgo === 1 ? "m" : "m"}`;
    } else {
      return "just now";
    }
  };

  // Function to mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await Axios.post("/client/notification/markAllAsRead");
      console.log("success markAllAsRead");
      setIsAction((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to mark notification as read by id
  const markAsReadById = async (id) => {
    try {
      await Axios.post("/client/notification/markAsReadById/" + id);
      console.log("success markAsReadById");
      setIsAction((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  // ... (your existing code)

  // JSX for displaying notifications
  const showNotifications = notifications
    .slice(0, 15)
    .map((notification, index) => (
      <Dropdown.Item
        key={index}
        className={`p-0 text-black ${notification.read_at ? "" : "unread"}`}
      >
        <Link to={"/index/orders"}>
          <div
            onClick={() => markAsReadById(notification.id)}
            style={{
              borderBottom: "2px solid white",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: notification.read_at ? "" : "#f0f8ff",
            }}
          >
            <div className="px-3 text-white w-100 m-0">
              <span className="m-0">
                <span
                  style={{
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {" "}
                  has changed to {notification.data.status}
                </span>{" "}
              </span>
              <br />
              <span style={{ color: "black" }}>
                {formatTimeAgo(notification.created_at)}
              </span>
            </div>
          </div>
        </Link>
      </Dropdown.Item>
    ));

  // ... (your existing code)

  // JSX for displaying categories
  const showCategories = categories.map((category, index) => (
    <NavDropdown.Item key={index} className="category-item">
      <Link
        to={`/index/categoryProducts/${category.id}`}
        className="category-link"
      >
        <img
          src={category?.image}
          alt={`${category.title} `}
          className="category-image"
        />
        {category.title}
      </Link>
    </NavDropdown.Item>
  ));
  // JSX for displaying left navigation bar
  const showLeftNavBar = (
    <Nav className="me-auto ">
      <Navbar.Brand>
        <Link className="navbar-brand" to="/index/HomePage">
          <img
            src={isGetSettings && settings.logo}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "2px",
            }}
            alt="none"
          />
        </Link>
      </Navbar.Brand>
      <Link to="/index/HomePage" className="navbar-brand mt-2">
        Home
      </Link>
      <Link to="/index/about" className="navbar-brand mt-2">
        About
      </Link>
      <a href="#down" className="navbar-brand mt-2">
        ContactUs
      </a>

      <NavDropdown
        title="Categories"
        id="basic-nav-dropdown"
        className="custom-dropdown"
      >
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Categories"
            aria-label="Search Categories"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
        <div className="category-dropdown-menu">{showCategories}</div>
      </NavDropdown>
    </Nav>
  );

  // right side
  const showRightSide = (
    <div className="d-flex me-5">
      {isAuthExist && (
        <Dropdown className="mt-1 me-2" drop="down" align="end">
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

            {countUnreadNotifications === 0 ? (
              ""
            ) : (
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
                {" "}
                {countUnreadNotifications}
              </span>
            )}
          </Dropdown.Toggle>
          {isGet && (
            <Dropdown.Menu style={{ fontSize: "12px", padding: 0 }}>
              <div className="d-flex justify-content-center">
                <Dropdown.Item className="bg-secondary text-white w-100 ">
                  <div
                    cursor={"pointer"}
                    onClick={markAllAsRead}
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
              {showNotifications}
              {/* <Dropdown.Item className="bg-secondary w-100 ">
               <div className="bg-secondary text-white w-100">
                 See All Notifications
               </div>
             </Dropdown.Item> */}
            </Dropdown.Menu>
          )}
        </Dropdown>
      )}

      {!isAuthExist ? (
        <Link className="btn btn-primary me-3" to="/login">
          Login
        </Link>
      ) : (
        //  user details logout and  ...
        <NavDropdown
          title={<FontAwesomeIcon icon={faUser} className="fs-6" />}
          className="mt-2 pt-1 ms-3  text-primary"
          id="basic-nav-dropdown"
          drop="down"
          align="end"
        >
          {" "}
          <NavDropdown.Item>
            <Link className="nav-link" to={"/index/userDetails"}>
              <FontAwesomeIcon icon={faUserTie} /> {isAuthExist.name}
            </Link>
          </NavDropdown.Item>
          {isAuthExist.role !== "2001" && (
            <NavDropdown.Item>
              <Link className="nav-link" to={"/dashboard"}>
                <FontAwesomeIcon icon={faDashcube} /> Dashboard
              </Link>
            </NavDropdown.Item>
          )}
          <NavDropdown.Item>
            <Link className="nav-link" to={"/index/orders"}>
              <FontAwesomeIcon icon={faJediOrder} /> orders
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link className="nav-link" to={"carts"}>
              <FontAwesomeIcon icon={faCartPlus} /> carts
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link className="nav-link" to={"/logout"}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </div>
  );
  // JSX for the entire component
  return (
    <>
      <Navbar
        expand="sm"
        bg="light"
        data-bs-theme="light"
        className="shadow-sm myTop bg-body-tertiary fixed-top"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* // icon home contact us about  */}
            {showLeftNavBar}
          </Navbar.Collapse>
          {/* notifications dropdown and userDropDown*/}
          {showRightSide}
        </Container>
      </Navbar>
    </>
  );
}
