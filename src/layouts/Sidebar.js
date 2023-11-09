import HeaderLinks from "./HeaderLinks";
import { AiOutlineClose } from 'react-icons/ai';

export default function Sidebar ({navbarOpen, isLoading, isAuth, handleLogout, changeNavbar}) {
    return (
        <aside className={"w-64 fixed" + (navbarOpen ? " " : " hidden")} aria-label="Sidebar">
            <div className="px-3 py-4 h-screen overflow-y-auto rounded bg-secondary">
                <div className="ml-2">
                    <div className="flex justify-end align-top text-center items-center">
                        <button className="p-1 bg-red-600 hover:bg-red-800 rounded-md ring ring-transparent active:ring-black/50 ring-rounded">
                            <AiOutlineClose onClick={changeNavbar} className="fill-white" />
                        </button>
                    </div>
                    <HeaderLinks
                        isAuth={isAuth} 
                        handleLogout={handleLogout}
                        changeNavbar={changeNavbar}
                    />
                </div>
            </div>
        </aside>
    )
}