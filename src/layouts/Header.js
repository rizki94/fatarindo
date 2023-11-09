import { useState, useEffect, useContext }from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../services/api';
import logo from '../assets/logo.png';
import logoDark from '../assets/logodark.png';
import Sidebar from './Sidebar';
import HeaderLinks from './HeaderLinks';
import { ThemeContext } from '../context/ThemeProvider';
import { Loading } from './forms/Form';

const Header = () => {

    const [ navbarOpen, setNavbarOpen ] = useState(false);
    const [ isAuth, setIsAuth ] = useState (false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchError, setFetchError ] = useState(null);
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect (() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await apiClient.get('api/checkingauthenticated')
                if (isMounted) {
                    if (response.data.status === 200) {
                        setIsAuth(true)
                    }
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    console.log(fetchError)
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

    const handleLogout = async (e) => {
        e.preventDefault();
        apiClient.post('api/logout')
        .then((response) => {
            if (response.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
            }
            setNavbarOpen(!navbarOpen);
            navigate('/login')
        })
    }

    const changeNavbar = () => {
        setNavbarOpen(!navbarOpen);
    }

    return (
        <>
        { isLoading ? <Loading /> :
        <>
        <nav className="flex items-center justify-between flex-wrap bg-secondary p-6">
            <div className="flex items-center flex-shrink-0 bg-secondary text-secondary mr-6">
                { theme.theme === 'dark' ?
                <img src={logoDark} className='h-7 w-7 mr-1' alt="logoDark"/> :
                <img src={logo} className='h-7 w-7 mr-1' alt="logo"/> }
                <span className="font-semibold text-xl tracking-tight">HR Distribusindo</span>
            </div>
            <div className="block lg:hidden">
                { !navbarOpen &&
                <button onClick={changeNavbar} className="flex items-center px-3 py-2 border rounded border-primary">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
                }
            </div>
            <div className={"w-full flex-grow lg:flex justify-between lg:items-center lg:w-auto hidden"}>
                <HeaderLinks
                    isAuth={isAuth} 
                    handleLogout={handleLogout}
                />
            </div>
        </nav>
        <Sidebar
            isAuth={isAuth} 
            handleLogout={handleLogout}
            navbarOpen={navbarOpen}
            changeNavbar={changeNavbar}
        />
        </>
        }
        </>
    )
}

export default Header