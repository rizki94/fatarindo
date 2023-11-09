import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SysProtectedRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();
    return auth?.token ? (
        <Outlet />
    ) : (
        <Navigate to="/sys_login" state={{ from: location }} replace />
    );
};

export default SysProtectedRoute;
