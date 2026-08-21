import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoutes() {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const auth = useSelector((state) => state.auth);
  if(!isAuthenticated){
    toast.error("Please log in to access this page.");
    return <Navigate to="/" replace />;
  }
  if(auth.user.active === false){
    toast.error("Your account is inactive. Please contact the administrator.");
    return <Navigate to="/" replace />;
  }

  return isAuthenticated && auth.user.role=="user" && auth.user.active ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" replace />
  );
}

export default ProtectedRoutes;