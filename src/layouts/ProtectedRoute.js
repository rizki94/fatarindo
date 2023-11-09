import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { Loading } from './forms/Form';
import { useToast, useAuth } from '../hooks/Index'
import axios from 'axios';
import { url } from '../services/api';

export default function ProtectedRouted() {

    const [ isAuth, setIsAuth ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchError, setFetchError ] = useState(null);
    const { auth } = useAuth();
    const toast = useToast();

    useEffect (() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const fetch = axios.create({
                    baseURL: url,
                    withCredentials: true,
                });
                fetch.interceptors.request.use((config) => {
                    const token = auth?.token
                    config.headers['Authorization'] = token ? `Bearer ${token}` : ''
                    return config;
                });
                const response = await fetch.get('api/checkingauthenticated')
                if (isMounted) {
                    if (response.data.status === 200) {
                        setIsAuth(true)
                    }
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    toast('error', fetchError)
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        fetchData();
        const cleanUp = () => {
            isMounted = false;
        }
        return cleanUp;
    },[fetchError]);

    return (
        isLoading ? <Loading /> : isAuth ?
            <Outlet />
        : 
        <Navigate to="/login" />
    )
}