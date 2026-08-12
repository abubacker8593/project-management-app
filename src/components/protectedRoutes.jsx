import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const auth = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRoutes;