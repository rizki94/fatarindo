import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFetch, useFetchWithParams } from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import useDocTitle from "../../../hooks/useDocTitle";
import { Container, Select } from "../../../layouts/forms/Index";
import { Table } from "../../Table";
import { numberWithComma } from "../../../utils/helpers";
import { apiClient } from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import CustomModal from "../../../layouts/modal";
import { useModal } from "../../../hooks/useModal";
import moment from "moment/moment";

const AccountReceivableList = () => {
	const [t] = useTranslation();
	const title = t("sidebar.accountReceivableList");
	useDocTitle(title);
	const { auth } = useAuth();
	const toast = useToast();
	const [skipPageReset, setSkipPageReset] = useState(false);
	const [id, setId] = useState(0);
	const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
	const { data, isLoading } = useFetch("api/account_receivable/list");
	const { data: status } = useFetch("api/status/list");
	const { data: account_receivable_date, isLoading: accountReceivableLoading } =
		useFetchWithParams(
			"api/account_receivable_date/list",
			{
				params: {
					id: id,
				},
			},
			id
		);

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

	const updateMyData = (rowIndex, columnId, value) => {
		setSkipPageReset(false)
		setAccountReceivable((old) =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			})
		);
	};

	const EditableCell = ({
		value: initialValue,
		row,
		column: { id },
		updateMyData,
	}) => {
		const [value, setValue] = useState(initialValue);

		const onBlur = () => {
			setSkipPageReset(false)
			updateMyData(row.index, id, value);
			apiClient
				.post("api/account_receivable/update", {
					data: { ...row.original, status_id: value, user_id: auth.user.id },
				})
				.then((response) => {
					if (response.data.status === 200) {
						toast("success", t("toast.add.success"));
					}
				});
		};

		useEffect(() => {
			setValue(initialValue);
		}, [initialValue]);
		return (
			<Select
				className="w-48"
				size="small"
				data={status}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				onBlur={onBlur}
			/>
		);
	};

	const dateTime = (value) => {
		const momentDate = moment(value);
		return momentDate.format("YYYY-MM-DD hh:mm:ss");
	};

	useEffect(() => {
		setSkipPageReset(false)
	}, [accountReceivable]);

	const columnsAccount = useMemo(() => [
		{
			Header: t("general.date"),
			accessor: (d) => dateTime(d.created_at),
		},
		{
			Header: t("sidebar.users"),
			accessor: (d) => d?.user?.name,
		},
		{
			Header: t("general.status"),
			accessor: (d) => d?.status?.name,
		},
	]);

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
				sortType: "basic",
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
				accessor: 'amount',
				Cell:({row}) => {
					return numberWithComma(row.original.amount)
				},
				Filter: false,
			},
			{
				Header: t("general.status"),
				accessor: "status_id",
				Cell: EditableCell,
				Filter: ({ column: { filterValue, setFilter, id } }) => {
					return (
						<select
							id={id}
							className="h-6 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50"
							value={filterValue}
							onChange={(e) => {
								setSkipPageReset(true)
								setFilter(e.target.value || undefined);
							}}
						>
							<option value="">Semua</option>
							{status.map((option, i) => (
								<option key={i} value={option.id}>
									{option.name}
								</option>
							))}
						</select>
					);
				},
			},
		],
		[t, status, skipPageReset]
	);

	const handleClickTable = (data) => {
		setId(data.id);
		toggleModal();
	};

	return (
		<Container title={title}>
			<Table
				data={accountReceivable}
				columns={columns}
				isLoading={isLoading}
				disableFilters={false}
				disableSortBy={false}
				pagination
				autoResetPage={skipPageReset}
				updateMyData={updateMyData}
				trOnClick={handleClickTable}
			/>
			{itemModalOpen && (
				<CustomModal
					title={t("general.changes")}
					isActive={itemModalOpen}
					handleClose={() => {
						setItemModalOpen(false);
						setId(0);
					}}
				>
					<Table
						data={account_receivable_date}
						columns={columnsAccount}
						isLoading={accountReceivableLoading}
						pagination
					/>
				</CustomModal>
			)}
		</Container>
	);
};

export default AccountReceivableList;
