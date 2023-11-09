import React, { useEffect, useMemo, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import useDocTitle from "../../../hooks/useDocTitle";
import { Container, Select } from "../../../layouts/forms/Index";
import { SelectColumnFilter, Table } from "../../Table";
import { numberWithComma } from "../../../utils/helpers";
import { apiClient } from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";

const AccountReceivableList = () => {
	const [t] = useTranslation();
	const title = t("sidebar.accountReceivableList");
	useDocTitle(title);
	const { auth } = useAuth();
	const toast = useToast();
	const { data, isLoading } = useFetch("api/account_receivable/list");
	const { data: status, isLoading: statusIsLoading } =
		useFetch("api/status/list");

	const [accountReceivable, setAccountReceivable] = useState([]);

	useEffect(() => {
		if (data.length > 0) {
			setAccountReceivable(
				[...data].map((object) => {
					const due_date = new Date(object.due_date);
					const diffTime = due_date - new Date();
					return {
						...object,
						overdue: Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
					};
				})
			);
		}
	}, [data]);

	const columns = useMemo(
		() => [
			{
				Header: t("element.invoice"),
				accessor: "invoice",
			},
			{
				Header: t("general.date"),
				accessor: "date",
				Filter: false,
			},
			{
				Header: t("general.dueDate"),
				accessor: "due_date",
				Filter: false,
			},
			{
				Header: t("element.overdue"),
				accessor: "overdue",
				Filter: false,
				sortType: "basic"
			},
			{
				Header: t("element.outletCode"),
				accessor: "outlet_code",
			},
			{
				Header: t("element.outletName"),
				accessor: (d) => d.customer.name,
			},
			{
				Header: t("element.amount"),
				accessor: (d) => numberWithComma(d.amount),
				Filter: false,
			},
			{
				Header: t("general.status"),
				accessor: "status_id",
				Cell: ({ row }) => (
					<Select
						size="small"
						boxSize="small"
						value={row.original.status_id}
						data={status}
						onChange={(e) => {
							setAccountReceivable(
								[...accountReceivable].map((object) => {
									if (object.id === row.original.id) {
										return {
											...object,
											status_id: e.target.value,
										};
									} else return object;
								})
							);
							apiClient
								.post("api/account_receivable/update", {
									data: {
										...row.original,
										status_id: e.target.value,
										user_id: auth.user.id,
									},
								})
								.then((response) => {
									if (response.data.status === 200) {
										toast("success", t("toast.add.success"));
									}
								});
						}}
					/>
				),
				Filter: SelectColumnFilter,
			},
		],
		[t, status]
	);

	return (
		<Container>
			<Table
				data={accountReceivable}
				columns={columns}
				isLoading={isLoading}
				disableFilters={false}
				disableSortBy={false}
			/>
		</Container>
	);
};

export default AccountReceivableList;
