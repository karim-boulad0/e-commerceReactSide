import { createContext, useEffect, useState } from "react";
export const WindowSize = createContext(null);
export default function WindowContext({ children }) {
  const [windowWidth, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", setWindowWidth);
  }, []);
  return (
    <WindowSize.Provider value={{ windowWidth, setWindowSize }}>
      {children}
    </WindowSize.Provider>
  );
}
