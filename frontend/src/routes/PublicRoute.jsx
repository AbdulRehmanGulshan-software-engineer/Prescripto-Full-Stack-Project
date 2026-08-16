import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PublicRoute = () => {
  const { token, loading } = useAuth();

  /*
    Wait for session restoration.
  */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  /*
    User is already authenticated.

    There is no reason to show login/register again.
  */
  if (token) {
    return <Navigate to="/" replace />;
  }

  /*
    User is not authenticated.
    Allow public page.
  */
  return <Outlet />;
};

export default PublicRoute;