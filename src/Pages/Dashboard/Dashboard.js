import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css";

export default function Dashboard({setting,PropNotification}) {


  return (
    <div className="position-relative">
      <TopBar setting={setting}  PropNotification={PropNotification}/>
      <div className="dashboard d-flex gap-1" style={{ marginTop: "70px" }}>
        <SideBar />
        {/* Pass the settings and updateSettings function to child components */}
        <Outlet  />
      </div>
    </div>
  );
}
