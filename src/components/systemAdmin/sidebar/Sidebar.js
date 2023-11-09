import { useState } from "react";
import { SidebarData } from "./SidebarData";
import Menu from "./Menu";

export default function Sidebar() {
	const [selected, setSelected] = useState("");
	const handleSelected = (select) => setSelected(select);
	return (
		<aside
			tabIndex="-1"
			className="fixed flex flex-col border-r border-border h-full left-0 w-64 bg-primary text-secondary transition-all duration-300 sidebar z-20"
		>
			<div
				id="table-scroll"
				className="overflow-y-auto overflow-x-hidden flex flex-col justify-between px-2 mt-16"
			>
				{SidebarData.map((item, index) => {
					return (
						<Menu
							item={item}
							key={index}
                            selected={selected}
							handleSelected={handleSelected}
						/>
					);
				})}
			</div>
		</aside>
	);
}
