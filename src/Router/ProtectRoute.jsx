import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location.pathname);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user) {
    return children;
  }
  if (!user) {
    return <Navigate state={location.pathname} to={"/login"} replace />;
  }
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectRoute;
