import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore";

const PublicOnlyRoute = observer(({ children }) => {
  if (userStore.isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
});

export default PublicOnlyRoute;
