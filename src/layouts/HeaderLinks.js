import Toggle from '../components/themeToggle';
import { NavLink } from './Link';

export default function HeaderLinks ({isAuth, handleLogout, changeNavbar}) {
    return (
        <div className="flex w-full space-y-2 flex-col lg:flex-row justify-between items-start lg:items-center align-middle">
            <div className='flex space-y-2 lg:space-y-0 flex-col whitespace-nowrap lg:flex-row items-start lg:items-center'>
                <NavLink changeNavbar={changeNavbar} to="/">Home</NavLink>
                <NavLink changeNavbar={changeNavbar} to="/about">Tentang Kami</NavLink>
                <NavLink changeNavbar={changeNavbar} to="/career">Karir</NavLink>
            </div>
            <div className="flex w-full flex-row lg:justify-end justify-between">
                <div className='flex'>
                    <NavLink changeNavbar={changeNavbar} to="/admin">Admin</NavLink>
                </div>
                <div className='flex justify-end'>
                    { isAuth ?
                    <span onClick={handleLogout} className="inline-block mr-4 hover:text-buttonPrimary cursor-pointer">
                        Logout
                    </span>
                    :
                    <NavLink changeNavbar={changeNavbar} to="/login">Login</NavLink>
                    }
                    <Toggle />
                </div>
            </div>
        </div>
    )
}