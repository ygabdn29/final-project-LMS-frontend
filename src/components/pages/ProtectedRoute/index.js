import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userDetails = JSON.parse(sessionStorage.getItem("userData"));

  if (!userDetails) return <Navigate to="/login"></Navigate>;
  return children;
}

export default ProtectedRoute;
