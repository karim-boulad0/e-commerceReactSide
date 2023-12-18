import React, { useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import "./Test.css";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
export default function Test() {
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
  }, [IsAction]);
  // get notifications
  useEffect(() => {
    Axios.get("/dashboard/admin/notification/all")
      .then((response) => {
        const notificationsArray = Object.values(response.data.notifications || {});
        setNotifications(notificationsArray);
        setIsGet(true);
      })
      .catch((err) => console.log(err));
  }, [IsAction]);
  // show data
  const notificationItems =
    isGet &&
    notifications.slice(0, 10).map((notification) => (
      <Dropdown.Item
        key={notification.id}
        className="p-0 text-black"
        style={{
          borderBottom: "2px solid white",
          borderRadius: "5px",
        }}
      >
        {notification.read_at === null ? (
          <Link
            onClick={() => markAsReadById(notification.id)}
            to={`notifications/${notification.id}`}
          >
            <div
              className={`bg-${notification.read_at ? "success" : "primary"
                } px-3 text-white w-100 m-0`}
            >
              <span className="m-0">
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {notification.data.client[0].user_details.last_name}  {notification.data.client[0].name}  
                  
                </span>
              </span>
              <br />
              <span>new order</span>
              <span>{formatTimeAgo(notification.created_at)}</span>
            </div>
          </Link>
        ) : (
          <Link to={`notifications/${notification.id}`}>
            <div className="bg-success px-3 text-white w-100 m-0">
              <span className="m-0">
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {notification.data.client[0].name}
                </span>
              </span>
              <br />
              <span>{formatTimeAgo(notification.created_at)}</span>
            </div>
          </ Link>
        )}
      </Dropdown.Item>
    ));
  const ShowDropNotificationsWithCountIt = (isGet && (
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
  )
  )
  return (
    <div className="container">
      {ShowDropNotificationsWithCountIt}
    </div>
  );
}
