import { Outlet } from "react-router-dom";

function MentorDashboard() {
  return (
    <>
      <h1>Mentor Dashboard</h1>
      <Outlet></Outlet>
    </>
  );
}

export default MentorDashboard;
