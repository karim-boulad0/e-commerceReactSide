import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Alert, Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import Spinner from "../../../Components/Global/Spinner.js";
import "./Notifications.css";
export default function Notifications() {
  const [notifications, setNotifications] = useState(null);
  const [isGet, setIsGet] = useState(false);
  const [isCahnge, setIsCahnge] = useState(0);

  useEffect(() => {
    Axios.get("/dashboard/admin/notification/all")
      .then((data) => {
        setIsGet(true);
        const notificationsArray = Object.values(data.data.notifications || {});
        setNotifications(notificationsArray);
      })
      .catch((err) => console.log(err));
  }, [isCahnge]);
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
  async function markAsReadById(id) {
    await Axios.post("/dashboard/admin/notification/markAsReadById/" + id)
      .then(() => {
        setIsCahnge((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!notifications) {
    return <Spinner />;
  }
  if (isGet && notifications.length === 0) {
    <Container className="mt-5">
      <h1>Notifications</h1>
      <h4> no notifications found</h4>
    </Container>;
  }
  return (
    <Container className="container">
      <h1>Notifications</h1>
      <Row>
        {isGet && notifications.length === 0 ? (
          <div className="no-notifications">
            <h4>No notifications found</h4>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <Link
              key={index}
              onClick={() => {
                markAsReadById(notification.id);
              }}
              to={`/dashboard/orders/${notification?.data?.order[0]?.id}`}
            >
              <Col key={notification.id} md={12} lg={12}>
                <Alert
                  className={`${
                    notification.read_at === null ? "unread" : ""
                  } alert`}
                >
                  <Alert.Heading>{notification.id}</Alert.Heading>
                  <p>
                    first_name:{" "}
                    {notification.data.client[0].user_details?.first_name}
                  </p>
                  <p>
                    {" "}
                    last_name:{" "}
                    {notification.data.client[0].user_details?.last_name}{" "}
                  </p>
                  <p>Email: {notification.data.client[0].email}</p>
                  <p>
                    address: {notification.data.client[0].user_details?.address}
                  </p>
                  <p>
                    phone_number:{" "}
                    {notification.data.client[0].user_details?.phone_number}
                  </p>
                  <p>{formatTimeAgo(notification.created_at)} ago</p>{" "}
                </Alert>
              </Col>
            </Link>
          ))
        )}
      </Row>
    </Container>
  );
}
