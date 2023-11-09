import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/Index";

const RequireAuth = ({ allowedPermission }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.permission?.find((role) =>
        allowedPermission?.includes(role)
    ) ? (
        <Outlet />
    ) : auth?.token ? (
        <Navigate to="/401" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
