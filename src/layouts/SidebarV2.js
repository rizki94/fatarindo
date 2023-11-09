import { useState } from "react";
import * as MdIcons from "react-icons/md";
import { useAuth } from "../hooks/Index";
import { useTranslation } from "react-i18next";
import NestedSubMenu from "./AdminNestedSubMenu";
import { SidebarLink } from "./Link";

const SidebarV2 = ({ item, handleSelected, selected }) => {
	const [t] = useTranslation();
	const { auth } = useAuth();
	const [subnav, setSubnav] = useState(false);
	const showSubnav = () => setSubnav(!subnav);
	return (
		<aside>
			<div className="h-full overflow-y-auto justify-center items-center">
				<ul className="font-medium">
					{item.path ? (
						<SidebarLink
							className={`select-none flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
							to={item.path}
							onClick={item.subNav && showSubnav}
						>
							<div className="flex justify-between w-full items-center">
								<div className="flex flex-row justify-center items-center gap-5">
									<span className="group-hover:scale-125 group-hover:text-buttonPrimary transition-all duration-300">
										{item.icon}
									</span>
									<span className="flex text-left whitespace-nowrap">
										{t(item.title)}
									</span>
								</div>
							</div>
						</SidebarLink>
					) : (
						<li>
							{(auth?.permission?.filter((role) =>
								item?.subNav?.map((item) => item.name).includes(role)
							).length > 0 ||
								auth.permission.filter((role) =>
									item?.subNav
										?.map((numbers) => numbers?.subNav?.map((n) => n?.name))
										.flat()
										?.includes(role)
								).length > 0) && (
								<button
									type="button"
									className="select-none flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									onClick={item.subNav && showSubnav}
								>
									<div className="flex justify-between w-full items-center">
										<div className="flex flex-row justify-center items-center gap-5">
											<span className="group-hover:scale-125 group-hover:text-buttonPrimary transition-all duration-300">
												{item.icon}
											</span>
											<span className="flex text-left whitespace-nowrap">
												{t(item.title)}
											</span>
										</div>
										<div>
											{item.subNav && subnav ? (
												<MdIcons.MdKeyboardArrowUp />
											) : item.subNav ? (
												<MdIcons.MdKeyboardArrowRight />
											) : null}
										</div>
									</div>
								</button>
							)}
							{subnav &&
								item.subNav.map((s, indexSub) => {
									return (
										<NestedSubMenu
											s={s}
											key={indexSub}
											auth={auth}
											t={t}
											handleSelected={handleSelected}
											selected={selected}
										/>
									);
								})}
						</li>
					)}
				</ul>
			</div>
		</aside>
	);
};

export default SidebarV2;
