import { Navigate } from "react-router-dom";

function ProtectedRoute({ children,allowedRole }) {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (role !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
