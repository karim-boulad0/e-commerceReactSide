import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuContext from "./context/MenuContext";
import WindowContext from "./context/WindowContext";
import { Toast } from "react-bootstrap";

const MainApp = () => {
  const requiredString = "http://localhost:3001/dashboa"; // i want also that page started  with this link to rerender
  const SecondRequiredString = "http://localhost:3000/dashboa"; // i want also that page started  with this link to rerender
  const currentUrl = window.location.href;
  const currentUrlSliced = currentUrl.slice(0, 29);
  const [showToast, setShowToast] = useState(false);
  const [PropNotification, setPropNotification] = useState(0);
  // real time NewOrderNotificationEvent
  useEffect(() => {
    Pusher.logToConsole = false;
    var pusher = new Pusher("0da7ff79eb735b3e41c6", {
      cluster: "ap2",
    });
    var channel = pusher.subscribe("Notifications");
    channel.bind("NewOrderNotificationEvent", function () {
      // Update state to show the toast
      if (currentUrlSliced === requiredString || SecondRequiredString === currentUrlSliced) {
        setShowToast(true);
        setPropNotification((prev) => prev + 1);
      }
    });
  }, [currentUrlSliced]);



  return (
    <React.StrictMode>
      <WindowContext>
        <MenuContext>
          <Router>
            <App PropNotification={PropNotification} />

          </Router>
          {/* Render the Toast component outside the Pusher callback */}
          <div>
            {showToast && (
              <Toast
                onClose={() => {
                  setShowToast(false);
                }}
                className="toast bg-success"
              >
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                  You have a new order
                </Toast.Body>
              </Toast>
            )}

          </div>
        </MenuContext>
      </WindowContext>
    </React.StrictMode>
  );
};

export default MainApp;
