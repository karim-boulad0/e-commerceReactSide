import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import TopNavBar from "./TopBar";
import { Outlet } from "react-router-dom";

export default function MainWebSiteLayout() {
  return (
    <>
      <TopNavBar className="bg-dark" />
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <div className="container mt-5 pt-5 flex-grow-1">
          <Outlet className="bg-dark" />
          <ScrollToTopButton/>
        </div>
        <footer className="footer" style={{ padding: "10px 0", backgroundColor: "black" }}>
          <Footer />
        </footer>
      </div>
    </>
  );
}
