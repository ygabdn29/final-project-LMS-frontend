import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <Outlet></Outlet>
    </>
  );
}

export default AdminDashboard;
