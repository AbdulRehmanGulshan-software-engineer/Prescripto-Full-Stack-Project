import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = () => {
  const { token, loading } = useAuth();
  const location = useLocation();

  /*
    Authentication state is still being restored.
    Don't make a routing decision yet.
  */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  /*
    User is NOT authenticated.
    Send them to login.

    We also save the current location so that
    later we can optionally return them to it.
  */
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  /*
    User is authenticated.
    Render the requested protected page.
  */
  return <Outlet />;
};

export default ProtectedRoute;