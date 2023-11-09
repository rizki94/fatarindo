import * as FiICons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";

export const SidebarData = [
	{
		title: "sidebar.activityLog",
		icon: <FiICons.FiActivity />,
		path: "/system_admin/activity_log",
	},
	{
		title: "admin.profile",
		icon: <AiIcons.AiOutlineProfile />,
		path: "/system_admin/profile/list",
	},
	{
		title: "sidebar.companies",
		icon: <HiIcons.HiOutlineOfficeBuilding />,
		path: "/system_admin/company/list",
	},
	{
		title: "sidebar.branches",
		icon: <AiIcons.AiOutlineBranches />,
		path: "/system_admin/branch/list",
	},
];
