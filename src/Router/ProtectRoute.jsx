import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} replace />;
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectRoute;
