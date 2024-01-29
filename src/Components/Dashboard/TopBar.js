import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faRightFromBracket,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../context/WindowContext";
import { Menu } from "../../context/MenuContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { NavDropdown } from "react-bootstrap";
import "./css/TopBar.css";
import "./css/Notifications.css";
export default function TopBar({ setting, PropNotification }) {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;

  const [user, setUser] = useState("");
  const userName = user.name;
  const windowSize = useContext(WindowSize);
  const Size = windowSize.windowWidth;

  const nav = useNavigate();
  const [settings, setSettings] = useState();
  const [isGetSettings, setIsGetSettings] = useState();

  const [IsAction, setIsAction] = useState(0);
  const [notifications, setNotifications] = useState(null);
  const [isGet, setIsGet] = useState(false);
  const [countUnreadNotifications, setCountUnreadNotifications] =
    useState(false);
  // handle show time of notifications
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
  // mark all as read
  async function MarkAllAsRead() {
    await Axios.post("/dashboard/admin/notification/markAllAsRead")
      .then(() => {
        setIsAction((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // mark  as read by id
  async function markAsReadById(id) {
    await Axios.post("/dashboard/admin/notification/markAsReadById/" + id)
      .then(() => {
        setIsAction((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // count unread notifications
  useEffect(() => {
    Axios.get("/dashboard/admin/notification/countUnreadNotifications")
      .then((data) => {
        setCountUnreadNotifications(data.data);
      })
      .catch((err) => console.log(err));
  }, [IsAction, PropNotification]);
  // get notifications
  useEffect(() => {
    Axios.get("/dashboard/admin/notification/all")
      .then((response) => {
        const notificationsArray = Object.values(
          response.data.notifications || {}
        );
        setNotifications(notificationsArray);
        setIsGet(true);
      })
      .catch((err) => console.log(err));
  }, [IsAction, PropNotification]);
  const notificationItems =
    isGet &&
    notifications.slice(0, 10).map((notification) => (
      <Dropdown.Item
        key={notification.id}
        className={` ${notification.read_at === null ? "unread" : ""}`}
      >
        {notification.read_at === null ? (
          <Link
            onClick={() => markAsReadById(notification.id)}
            to={`/dashboard/orders/${notification?.data?.order[0]?.id}`}
          >
            <div>
              <span>
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {notification.data.client[0].name}{" "}
                  {notification.data.client[0].user_details.last_name}
                </span>
              </span>
              <br />
              <span>new order</span>
              <span>{formatTimeAgo(notification.created_at)}</span>
            </div>
          </Link>
        ) : (
          <Link to={`/dashboard/orders/${notification?.data?.order[0]?.id}`}>
            <div>
              <span>
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {notification.data.client[0].name}
                </span>
              </span>
              <br />
              <span>{formatTimeAgo(notification.created_at)}</span>
            </div>
          </Link>
        )}
      </Dropdown.Item>
    ));
  const ShowDropNotificationsWithCountIt = isGet && (
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
            display: countUnreadNotifications === 0 ? "none" : "block",
          }}
        >
          {countUnreadNotifications === 0 ? "" : countUnreadNotifications}
        </span>
      </Dropdown.Toggle>

      {isGet ? (
        <Dropdown.Menu style={{ fontSize: "12px", padding: 0 }}>
          <div className="d-flex justify-content-center">
            <Dropdown.Item className="bg-secondary text-white w-100 ">
              <div
                cursor={"pointer"}
                onClick={MarkAllAsRead}
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
          {notificationItems}
          <Dropdown.Item className="bg-secondary w-100 ">
            <Link
              to={"notifications"}
              className="bg-secondary  text-white   w-100"
            >
              See All Notifications
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      ) : null}
    </Dropdown>
  );

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
      className="top-bar myTop shadow-sm d-flex align-items-center justify-content-between"
      style={{ width: Size < 400 ? "390px" : "100%" }}
    >
      <div className="d-flex align-items-center">
        <h3 className="me-4">
          <Link className=" E-Commerce" to="/index/HomePage">
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
        <div>{ShowDropNotificationsWithCountIt}</div>
        <NavDropdown
          title={<FontAwesomeIcon icon={faUser} className="fs-6" />}
          className="pt-2 mb-2  text-primary"
          id="basic-nav-dropdown"
        >
          {/* <NavDropdown.Item>
            <div>{userName}</div>
          </NavDropdown.Item> */}
          <NavDropdown.Item>
            <div onClick={handleProf} className="list-down">
              <FontAwesomeIcon icon={faUserTie} /> {userName}
            </div>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <div className="" onClick={() => nav("/logout")}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </div>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
}
