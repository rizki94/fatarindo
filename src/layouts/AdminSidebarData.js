import * as MdIcons from "react-icons/md";
import * as VscIcons from "react-icons/vsc";

export const SidebarData = [
	{
		title: "sidebar.master",
		icon: <VscIcons.VscSettingsGear />,
		subNav: [
			{
				title: "sidebar.users",
				name: "user-list",
				path: "/admin/user/list",
			},
			{
				title: "sidebar.roles",
				name: "role-list",
				path: "/admin/roleslist",
			},
		],
	},
	{
		title: "sidebar.accountReceivable",
		icon: <MdIcons.MdPayment />,
		subNav: [ 
			{
				title: "sidebar.accountReceivableImport",
				name: "account-receivable-import",
				path: "account_receivable/import",
			},
			{
				title: "sidebar.accountReceivableList",
				name: "account-receivable-list",
				path: "account_receivable/list",
			},
		],
	},
];
