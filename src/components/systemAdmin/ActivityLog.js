import React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFetch, useDocTitle } from "../../hooks/Index";
import { Container } from "../../layouts/forms/Container";
import { Table } from "../Table";

const ActivityLog = () => {
	const [t] = useTranslation();
	const title = t("sidebar.activityLog");
	useDocTitle(title);
	const { data: activities } = useFetch("api/system_admin/activity_log/list");
	const columns = useMemo(
		() => [
			{
				Header: () => null,
				id: "expander",
				Cell: ({ row }) => (
					<span {...row.getToggleRowExpandedProps()}>
						{row.isExpanded ? "👇" : "👉"}
					</span>
				),
			},
			{
				Header: t("table.name"),
				accessor: "log_name",
			},
			{
				Header: "activity",
				accessor: "description",
			},
			{
				Header: "event",
				accessor: "event",
			},
			{
				Header: "causer",
				accessor: "user.name",
			},
			{
				Header: "model id",
				accessor: "subject_id",
			},
			{
				Header: "invoice",
				accessor: "batch_uuid",
			},
			{
				Header: "created",
				accessor: "created_at",
			},
			{
				Header: "updated",
				accessor: "updated_at",
			},
		],
		[t]
	);

	const renderRowSubComponent = React.useCallback(
		({ row }) => (
			<pre
				style={{
					fontSize: "10px",
				}}
			>
				<code>
					{JSON.stringify(
						{ values: row.original.properties },
						null,
						2
					)}
				</code>
			</pre>
		),
		[]
	);

	return (
		<Container title={title}>
			<Table
				columns={columns}
				data={activities}
				pagination
				renderRowSubComponent={renderRowSubComponent}
				disableFilters={false}
			/>
		</Container>
	);
};

export default ActivityLog;
