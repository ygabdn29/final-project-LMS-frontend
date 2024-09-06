import { useState } from "react";
import AdminDashboard from "../../pages/adminDashboard/inedx";
import MentorDashboard from "../../pages/mentorDashboard";
import MenteeDashboard from "../../pages/menteeDashboard";

function Dashboard({ children }) {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  return (
    <div className="fix-header fix-sidebar card-no-border">
      <div className="preloader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle
            className="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
          />{" "}
        </svg>
      </div>
      <div id="main-wrapper">
        <header className="topbar">
          <nav className="navbar top-navbar navbar-expand-md navbar-light">
            <div className="navbar-header"></div>
            <div className="navbar-collapse">
              <ul className="navbar-nav mr-auto mt-md-0 ">
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ti-menu"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="icon-arrow-left-circle"></i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <aside className="left-sidebar">
          <div className="scroll-sidebar">
            <nav className="sidebar-nav"></nav>
          </div>
          <div className="sidebar-footer"></div>
        </aside>

        <div className="page-wrapper">
          <div className="container-fluid">
            <h1>Dashboard</h1>
            {user.authenticatedUserRole === "Admin" ? (
              <AdminDashboard></AdminDashboard>
            ) : (
              ""
            )}
            {user.authenticatedUserRole === "Mentor" ? (
              <MentorDashboard></MentorDashboard>
            ) : (
              ""
            )}
            {user.authenticatedUserRole === "Mentee" ? (
              <MenteeDashboard></MenteeDashboard>
            ) : (
              ""
            )}
            {console.log(user.authenticatedUserRole)}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
