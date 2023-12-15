import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import App from "./App";
import "./index.css";
import "./Css/form.css";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuContext from "./context/MenuContext";
import WindowContext from "./context/WindowContext";

const MainApp = () => {
  return (
    <React.StrictMode>
      <WindowContext>
        <MenuContext>
          <Router>
            <App />
          </Router>
        </MenuContext>
      </WindowContext>
    </React.StrictMode>
  );
};

export default MainApp;
