import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth, useRefreshToken } from "../hooks/Index";
import { Loading } from "../layouts/forms/Form";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.token && persist ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <Loading />
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin