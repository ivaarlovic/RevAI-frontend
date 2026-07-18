import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from "react-router-dom";
import { userStore } from "../../stores/UserStore";

const ProtectedRoute = observer(({ children }) => {
  const location = useLocation();

  if (!userStore.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
});

export default ProtectedRoute;
