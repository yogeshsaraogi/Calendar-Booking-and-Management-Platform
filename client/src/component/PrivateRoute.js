import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element: Element, roles }) => {
  const { state } = useAuth();
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(state.user.role)) {
    return <Navigate to="/404" replace />;
  }

  return <Element />;
};

export default PrivateRoute;
