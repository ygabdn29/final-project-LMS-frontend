import { Outlet } from "react-router-dom";

function MenteeDashboard() {
  return (
    <>
      <h1>Mentee Dashboard</h1>
      <Outlet></Outlet>
    </>
  );
}

export default MenteeDashboard;
