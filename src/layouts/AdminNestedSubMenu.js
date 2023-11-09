import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as MdIcons from "react-icons/md";
import { SidebarLink } from "./Link";

const NestedSubMenu = ({ s, auth, handleSelected, selected }) => {
	const [t] = useTranslation();
	const [subNav, setSubNav] = useState(false);
	const showSubNav = () => setSubNav(!subNav);
	return (
		<div className="select-none cursor-pointer">
			{s.path && auth?.permission?.find((role) => s.name?.includes(role)) ? (
				<div
					className="flex items-center w-full group text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-9"
				>
					<div className="flex justify-between w-full items-center">
						<div className="flex flex-row justify-center items-center gap-5">
							<SidebarLink
								tabIndex="-1"
								className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
									selected === s.name && "text-buttonPrimary"
								}`}
								onClick={() => handleSelected(s.name)}
								to={s.path}
							>
								{t(s.title)}
							</SidebarLink>
						</div>
					</div>
				</div>
			) : (
				!s.path &&
				auth.permission.filter(
					(role) => s.subNav.map((e) => e?.name).indexOf(role) !== -1
				).length > 0 && (
					<div
						className={`${
							s.subNav &&
							subNav &&
							"bg-secondary transition duration-75 rounded-lg"
						}`}
					>
						<button
							type="button"
							className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-9`}
							onClick={s.subNav && showSubNav}
						>
							<div className="flex justify-between w-full items-center">
								<div className="flex flex-row justify-center items-center gap-5">
									<span className="flex px-2 text-left whitespace-nowrap">
										{t(s.title)}
									</span>
								</div>
								<div>
									{s.subNav && subNav ? (
										<MdIcons.MdKeyboardArrowUp />
									) : s.subNav ? (
										<MdIcons.MdKeyboardArrowRight />
									) : null}
								</div>
							</div>
						</button>
						{subNav &&
							s.subNav.map((a, nestedIndex) => {
								return (
									auth?.permission?.find((role) => a.name?.includes(role)) && (
										<div className="flex items-center w-full pl-9 group text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
										key={nestedIndex}>
											<div className="flex justify-between w-full items-center">
												<div className="flex flex-row justify-center items-center gap-5">
													<SidebarLink
														tabIndex="-1"
														className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
															selected === s.name && "text-buttonPrimary"
														}`}
														onClick={() => handleSelected(a.name)}
														to={a.path}
													>
														{t(a.title)}
													</SidebarLink>
												</div>
											</div>
										</div>
									)
								);
							})}
					</div>
				)
			)}
		</div>
	);
};

export default NestedSubMenu;
