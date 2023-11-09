import { useState } from "react";
import { SidebarData } from "./AdminSidebarData";
import SubMenu from "./AdminSubMenu";
import SidebarV2 from "./SidebarV2";
import Toggle from "../components/themeToggle";
import Locale from "../components/admin/Locale";
import AdminPanel from "../components/admin/AdminPanel";

export default function Sidebar({
	wrapperRef,
	toggleUser,
	handleLogout,
	auth,
	setToggleUser,
}) {
	const [selected, setSelected] = useState("");
	const handleSelected = (select) => setSelected(select);
	return (
		<aside
			tabIndex="-1"
			className="fixed flex flex-col border-r border-border h-full left-0 w-64 bg-primary text-secondary transition-all duration-300 sidebar z-30 lg:mt-0 mt-14"
		>
			<div className="sticky top-0 z-10">
				<div className="flex items-center justify-between h-14 p-2 border-b border-border">
					<Toggle />
					<AdminPanel
						wrapperRef={wrapperRef}
						toggleUser={toggleUser}
						setToggleUser={setToggleUser}
						handleLogout={handleLogout}
						auth={auth}
					/>
					<Locale />
				</div>
			</div>
			<div
				id="table-scroll"
				className="overflow-y-auto overflow-x-hidden flex flex-col px-2 mt-2"
			>
				{SidebarData.map((item, index) => {
					return (
						<SidebarV2
							item={item}
							selected={selected}
							handleSelected={handleSelected}
							key={index}
						/>
					);
				})}
			</div>
		</aside>
	);
}
