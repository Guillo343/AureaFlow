import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // aquí luego puedes poner <FullScreenLoader />
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
