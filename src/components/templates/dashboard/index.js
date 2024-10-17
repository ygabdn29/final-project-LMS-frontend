import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.css";

function Dashboard({ children }) {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("userDetails"))
  );

  return (
    <div className="fix-header fix-sidebar card-no-border">
      <div id="main-wrapper">
        <header className="topbar">
          <nav className="navbar top-navbar navbar-expand-md navbar-light">
            <div className="navbar-header"></div>
            <div className="navbar-collapse">
              <ul className="navbar-nav mr-auto mt-md-0 "></ul>
            </div>
          </nav>
        </header>

        {console.log(user)}
        <aside className="left-sidebar">
          <div className="scroll-sidebar">
            <nav className="sidebar-nav">
              <ul className="in">
                {user.userRole === "Mentee" ? (
                  <>
                    <li className="active">
                      <Link to="mentee/course/list">Enroll Course</Link>
                    </li>
                    <li className="active">
                      <a className="" onClick={(e) => handleLogout(e)}>
                        Logout
                      </a>
                    </li>
                  </>
                ) : user.userRole === "Mentor" ? (
                  <>
                    <li className="">
                      <Link to={`/dashboard/mentor`} className="">
                        Course
                      </Link>
                    </li>
                    <li className="">
                      <a className="" onClick={(e) => handleLogout(e)}>
                        Logout
                      </a>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </nav>
          </div>
          <div className="sidebar-footer"></div>
        </aside>

        <div className="page-wrapper">
          <div className="container-fluid">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

function handleLogout(e) {
  e.preventDefault();
  sessionStorage.removeItem("userDetails");
  window.location.replace("http://localhost:3000/login");
}

export default Dashboard;
