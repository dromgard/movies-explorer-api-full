import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {

  let location = useLocation();

  if (!loggedIn && (location.pathname === "/signin" || location.pathname === "/signup")) {
    return <Navigate to="/movies" replace />;
  }

  // Если неавторизован и идет на защищенные роуты, то перенаправляем на Главную.
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
