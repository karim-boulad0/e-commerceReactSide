import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import moment from "moment/moment";
import { Axios } from "../../../Api/Axios";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default function TopNavBar() {
  // State variables
  const [categories, setCategories] = useState([]);
  const [isAuthExist, setIsAuthExist] = useState(false);
  const [isGet, setIsGet] = useState(false);
  const [IsAction, setIsAction] = useState(0);

  const [settings, setSettings] = useState();
  const [isGetSettings, setIsGetSettings] = useState();

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
        const response = await Axios.get("/webSite/categoriesWithProducts");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);


  // useEffect to fetch settings
  useEffect(() => {
    Axios.get("/settings/index")
      .then((data) => {
        setSettings(data.data);
        setIsGetSettings(true);
      })
      .catch((err) => console.error(err));
  }, []);

  


  // JSX for displaying categories
  const showCategories = categories.map((category, index) => (
    <NavDropdown.Item key={index}>
      <div>
        <Link
          to={`/NavBar/categoryProducts/${category.id}`}
        >
          {category.title}
        </Link>
      </div>
    </NavDropdown.Item>
  ));

  // JSX for displaying left navigation bar
  const showLeftNavBar = (
    <Nav className="me-auto ">
      <Navbar.Brand>
        <Link className="navbar-brand" to="/NavBar/SecondHomePage">
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

      <Link to="/NavBar/SecondHomePage" className="navbar-brand mt-2">
        Home
      </Link>
      <Link to="/NavBar/about" className="navbar-brand mt-2">
        About
      </Link>
      <a href="#down" className="navbar-brand mt-2">
        ContactUs
      </a>

      <NavDropdown
        title="Categories"
        className="w-100 mt-2 "
        id="basic-nav-dropdown"
      >
        <div className="m-0 text-center p-0 ">{showCategories}</div>
        <div className="bg-black text-white w-100 m-0 text-center">
          <Link to={"/NavBar/categories"}>See All </Link>
        </div>
      </NavDropdown>
    </Nav>
  );

  // right side
  const showRightSide = (
    <div className="d-flex me-5">
      {isAuthExist && (
        <Dropdown className="mt-1 me-2 ">
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
                <div className="bg-secondary text-white w-100">
                  See All Notifications
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
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
        >
          {" "}
          <NavDropdown.Item>{isAuthExist.name}</NavDropdown.Item>
          <NavDropdown.Item>
            <Link className="nav-link" to={"/NavBar/userDetails"}>
              myProfile
            </Link>
          </NavDropdown.Item>
          {isAuthExist.role !== "2001" && (
            <NavDropdown.Item>
              <Link className="nav-link" to={"/dashboard"}>
                Dashboard
              </Link>
            </NavDropdown.Item>
          )}
          <NavDropdown.Item>
            <Link className="nav-link" to={"/NavBar/orders"}>
              orders
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link className="nav-link" to={"carts"}>
              carts
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link className="nav-link" to={"/logout"}>
              Logout
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
        className="shadow-sm bg-body-tertiary fixed-top"
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
