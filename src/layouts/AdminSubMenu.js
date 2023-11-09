import { useState } from "react";
import * as MdIcons from "react-icons/md";
import { useAuth } from "../hooks/Index";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NestedSubMenu from "./AdminNestedSubMenu";

const SubMenu = ({ item, handleSelected, selected }) => {
	const [t] = useTranslation();
	const { auth } = useAuth();
	const [subnav, setSubnav] = useState(false);
	const showSubnav = () => setSubnav(!subnav);
	return (
		<div>
			{item.path ? (
				<Link
					className={`flex group items-center w-full py-1 font-bold hover:text-buttonPrimary cursor-pointer pl-3 rounded-md`}
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
						<div>
							{item.subNav && subnav ? (
								<MdIcons.MdKeyboardArrowUp />
							) : item.subNav ? (
								<MdIcons.MdKeyboardArrowRight />
							) : null}
						</div>
					</div>
				</Link>
			) : (
				<div
					className={`flex group items-center w-full py-1 font-bold hover:text-buttonPrimary cursor-pointer pl-3 rounded-md`}
					onClick={item.subNav && showSubnav}
				>
					<div className="flex justify-between w-full items-center">
						<div className="flex flex-row justify-center items-center gap-5">
							<div className="group-hover:scale-125 group-hover:text-buttonPrimary transition-all duration-300">
								{item.icon}
							</div>
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
				</div>
			)}
			{subnav &&
				item.subNav.map((s, indexSub) => {
					return (
						<NestedSubMenu
							s={s}
							key={indexSub}
							index={indexSub}
							auth={auth}
							t={t}
							handleSelected={handleSelected}
							selected={selected}
						/>
					);
				})}
		</div>
	);
};

export default SubMenu;
