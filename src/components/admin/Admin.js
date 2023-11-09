import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../layouts/AdminSidebar";
import { useAuth, useLogout, useTheme } from "../../hooks/Index";
import { useRef } from "react";
import { useEffect } from "react";
import { VscListFlat } from "react-icons/vsc";

const AdminPage = () => {
	const { auth } = useAuth();
	function useOutsideAlerter(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setToggleUser(false);
				}
			}
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	const [toggle, setToggle] = useState(true);
	const [toggleUser, setToggleUser] = useState(false);
	const logout = useLogout();
	const navigate = useNavigate();

	const changeToggle = () => {
		setToggle(!toggle);
	};

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<main className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-primary text-primary">
			<div
				className={`flex items-center h-14 z-10 p-2 border-b border-border sticky lg:top-auto top-0 bg-primary ${
					toggle ? "lg:ml-64 ml-0" : "ml-0"
				}`}
			>
				<VscListFlat className="w-5 h-5 hover:fill-buttonPrimary cursor-pointer select-none" onClick={changeToggle} />
			</div>
			{toggle && (
				<Sidebar
					wrapperRef={wrapperRef}
					toggleUser={toggleUser}
					setToggleUser={setToggleUser}
					handleLogout={handleLogout}
					auth={auth}
					toggle={toggle}
				/>
			)}
			<div
				className={`max-w-screen h-full bg-primary transition-all duration-300 ${
					toggle ? "lg:ml-64 ml-0" : "ml-0"
				}`}
			>
					<Outlet />
			</div>
		</main>
	);
};

export default AdminPage;
