import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import { useAuth, useLogout } from "../../hooks/Index";
import { useRef } from "react";
import { useEffect } from "react";
import Toggle from "../themeToggle";
import Locale from "../admin/Locale";
import SysAdminNav from "./SysAdminNav";
import { useTranslation } from "react-i18next";

const SysAdmin = () => {
	const [t] = useTranslation();
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
	const [toggleUser, setToggleUser] = useState(false);
	const logout = useLogout();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/sys_login");
	};

	return (
		<main className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-primary text-primary">
			<div className="fixed w-full flex items-center justify-between border-b border-border align-middle bg-primary z-30">
				<div className="flex items-center gap-4 justify-start md:justify-center pl-3 h-14 border-none font-bold text-2xl">
					{t("navigation.sysAdmin")}
				</div>
				<div className="flex justify-between align-middle items-center gap-4 mx-4">
					<Toggle />
					<Locale />
					<SysAdminNav
						wrapperRef={wrapperRef}
						toggleUser={toggleUser}
						setToggleUser={setToggleUser}
						handleLogout={handleLogout}
						auth={auth}
					/>
				</div>
			</div>
			<Sidebar />
			<div className="h-full mt-14 bg-primary transition-all duration-300 ml-64">
				<Outlet />
			</div>
		</main>
	);
};

export default SysAdmin;
