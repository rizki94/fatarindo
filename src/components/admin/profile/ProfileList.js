import React, { useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import Button from "../../../layouts/forms/Button";
import { Container } from "../../../layouts/forms/Container";
import { SelectColumnFilter, Table } from "../../Table";
import { useTranslation } from "react-i18next";
import { VscEdit } from "react-icons/vsc";

const ProfileList = () => {
    const [t] = useTranslation();
	const { data, setData, isLoading, fetchError } =
		useFetch("api/profile/list");
	const navigate = useNavigate();
	const title = t("profile.list.title");

	const columns = useMemo(() => [
		{
			Header: () => t("table.id"),
			accessor: "id",
		},
		{
			Header: t("general.descr"),
			accessor: "descr",
		},
		{
			Header: t("general.parameter"),
			accessor: "parameter",
		},
		{
			Header: () => t("products.add.categories"),
			accessor: "module_group.name",
			Filter: SelectColumnFilter,
		},
		{
			Header: () => t("general.action"),
			accessor: "user_profile",
			Cell: ({ row }) => (
				<VscEdit
					className="w-5 h-5 cursor-pointer hover:fill-green-600 hover:scale-125"
					onClick={() => navigate(`../${row.original.id}`)}
				/>
			),
		},
	]);

	return fetchError ? (
		<Navigate to="/500" />
	) : (
		<Container
			navigation1={
				<Button onClick={() => navigate("../create")}>
					{t("general.add")}
				</Button>
			}
			title={title}
		>
			<Table
				isLoading={isLoading}
				data={data}
				columns={columns}
				disableFilters={false}
			/>
		</Container>
	);
};

export default ProfileList;
