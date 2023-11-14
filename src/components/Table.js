import React, { useState, useEffect, useMemo, useRef, forwardRef } from "react";
import {
	useTable,
	useFilters,
	useGlobalFilter,
	useSortBy,
	usePagination,
	useAsyncDebounce,
	useRowSelect,
	useMountedLayoutEffect,
	useGroupBy,
	useExpanded,
} from "react-table";
import { matchSorter } from "match-sorter";
import { PartialLoading } from "../layouts/forms/Form";
import { BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import NumberFormat from "react-number-format";
import Input from "../layouts/forms/Input";
import { useTranslation } from "react-i18next";
import Dropdown from "../layouts/forms/Dropdown";
import { useVirtualizer } from "@tanstack/react-virtual";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<input
			className="h-10 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50"
			value={value || ""}
			onChange={(e) => {
				setValue(e.target.value);
				onChange(e.target.value);
			}}
			placeholder="Cari data..."
		/>
	);
}

export function isValidDate(d) {
	const parsedDate = new Date(d);
	return parsedDate instanceof Date && !isNaN(parsedDate);
}

export function DateRangeColumnFilter({
	column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
	const [min, max] = useMemo(() => {
		let min = preFilteredRows.length
			? new Date(preFilteredRows[0].values[id])
			: new Date(0);
		let max = preFilteredRows.length
			? new Date(preFilteredRows[0].values[id])
			: new Date(0);

		preFilteredRows.forEach((row) => {
			const rowDate = new Date(row.values[id]);

			min = rowDate <= min ? rowDate : min;
			max = rowDate >= max ? rowDate : max;
		});

		return [min, max];
	}, [id, preFilteredRows]);

	return (
		<div className="flex flex-row gap-1">
			<Input
				className="w-24"
				size="noSize"
				boxSize="small"
				min={min.toISOString().slice(0, 10)}
				max={max.toISOString().slice(0, 10)}
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [val ? val : undefined, old[1]]);
				}}
				type="date"
				value={filterValue[0] || ""}
			/>
			<Input
				className="w-24"
				size="noSize"
				boxSize="small"
				min={min.toISOString().slice(0, 10)}
				max={max.toISOString().slice(0, 10)}
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [
						old[0],
						val ? val.concat("T23:59:59.999Z") : undefined,
					]);
				}}
				type="date"
				value={filterValue[1]?.slice(0, 10) || ""}
			/>
		</div>
	);
}

function dateBetweenFilterFn(rows, id, filterValues) {
	let sd = new Date(filterValues[0]);
	let ed = new Date(filterValues[1]);
	if (!isValidDate(filterValues[0]) || !isValidDate(filterValues[1]))
		return rows;
	return rows.filter((r) => {
		var time = new Date(r.values[id]);
		if (filterValues.length === 0) return rows;
		return time >= sd && time <= ed;
	});
}

dateBetweenFilterFn.autoRemove = (val) => !val;

function DefaultColumnFilter({
	column: { filterValue, preFilteredRows, setFilter, id },
}) {
	const count = preFilteredRows.length;

	return (
		<input
			id={id}
			autoComplete="false"
			className="h-6 w-32 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50"
			value={filterValue || ""}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
			placeholder={`Cari ${count} data...`}
		/>
	);
}

function SelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	const options = useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	return (
		<select
			id={id}
			className="h-6 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50"
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
		>
			<option value="">Semua</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

function SelectUniqueColumn({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	const options = useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	return (
		<select
			id={id}
			className="h-6 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50"
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
		>
			<option value="">Semua</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

function StatusColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	const options = useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	return (
		<select
			className="h-6 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50"
			id={id}
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
		>
			<option value="">Semua</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option === 1 ? "Aktif" : "Nonaktif"}
				</option>
			))}
		</select>
	);
}

function SliderColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	const [min, max] = useMemo(() => {
		let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		preFilteredRows.forEach((row) => {
			min = Math.min(row.values[id], min);
			max = Math.max(row.values[id], max);
		});
		return [min, max];
	}, [id, preFilteredRows]);

	return (
		<>
			<input
				type="range"
				min={min}
				max={max}
				value={filterValue || min}
				onChange={(e) => {
					setFilter(parseInt(e.target.value, 10));
				}}
			/>
			<button onClick={() => setFilter(undefined)}>Off</button>
		</>
	);
}

function NumberRangeColumnFilter({
	column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
	const [min, max] = useMemo(() => {
		let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		preFilteredRows.forEach((row) => {
			min = Math.min(row.values[id], min);
			max = Math.max(row.values[id], max);
		});
		return [min, max];
	}, [id, preFilteredRows]);

	return (
		<div className="flex items-center align-middle justify-center text-center">
			<input
				value={filterValue[0] || ""}
				type="number"
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [
						val ? parseInt(val, 10) : undefined,
						old[1],
					]);
				}}
				placeholder={`Min (${min})`}
				className="h-6 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50"
				style={{
					width: "70px",
					marginRight: "0.5rem",
				}}
			/>
			to
			<input
				value={filterValue[1] || ""}
				type="number"
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [
						old[0],
						val ? parseInt(val, 10) : undefined,
					]);
				}}
				placeholder={`Max (${max})`}
				className="h-6 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50"
				style={{
					width: "70px",
					marginLeft: "0.5rem",
				}}
			/>
		</div>
	);
}
function fuzzyTextFilterFn(rows, id, filterValue) {
	return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

function filterGreaterThan(rows, id, filterValue) {
	return rows.filter((row) => {
		const rowValue = row.values[id];
		return rowValue >= filterValue;
	});
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

function Table({
	scrollToBot,
	selectedRows,
	onSelectedRowsChange,
	autoResetPage,
	isLoading,
	columns,
	data,
	updateMyData,
	trClassName = false,
	trOnClick,
	height,
	footer,
	renderRowSubComponent,
	onRowSelect,
	pagination,
	hideColumn = false,
	disableSortBy = true,
	disableFilters = true,
	disableGroupBy = true,
}) {
	const [t] = useTranslation();
	const filterTypes = useMemo(
		() => ({
			fuzzyText: fuzzyTextFilterFn,
			dateBetween: dateBetweenFilterFn,
			text: (rows, id, filterValue) => {
				return rows.filter((row) => {
					const rowValue = row.values[id];
					return rowValue !== undefined
						? String(rowValue)
								.toLowerCase()
								.startsWith(String(filterValue).toLowerCase())
						: true;
				});
			},
		}),
		[]
	);

	const [width, setWidth] = useState(window.innerWidth);
	
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);
	
	const isMobile = width <= 768;

	const defaultColumn = useMemo(
		() => ({
			Filter: DefaultColumnFilter,
		}),
		[]
	);
	const {
		getToggleHideAllColumnsProps,
		allColumns,
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		prepareRow,
		visibleColumns,
		canPreviousPage,
		canNextPage,
		page,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		selectedFlatRows,
		state: { selectedRowIds, pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				selectedRowIds: selectedRows ? selectedRows : "",
			},
			autoResetPage: autoResetPage,
			defaultColumn,
			filterTypes,
			updateMyData,
			disableSortBy: disableSortBy,
			disableFilters: disableFilters,
			disableGroupBy: disableGroupBy,
		},
		useFilters,
		useGroupBy,
		useGlobalFilter,
		useSortBy,
		useExpanded,
		usePagination,
		useRowSelect,
		(hooks) => {
			if (onRowSelect || onSelectedRowsChange) {
				hooks.visibleColumns.push((columns) => [
					{
						id: "selection",
						Header: ({ getToggleAllRowsSelectedProps }) => (
							<div>
								<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
							</div>
						),
						Cell: ({ row }) => (
							<div>
								<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
							</div>
						),
					},
					...columns,
				]);
			}
		}
	);

	const scrollToEnd = useRef(null);

	useEffect(() => {
		scrollToBot && scrollToEnd?.current?.scrollIntoView({ behavior: "smooth" });
	}, [data, scrollToBot]);

	return (
		<>
			{hideColumn && (
				<Dropdown label={t("table.hideColumns")} className="mb-2">
					<li className="w-full items-center transform transition-colors duration-200 block px-2 py-1 hover:font-bold hover:bg-border hover:rounded-md cursor-pointer">
						<label>
							<input type="checkbox" {...getToggleHideAllColumnsProps()} />{" "}
							{t("general.selectAll")}
						</label>
					</li>
					{allColumns.map((column) => (
						<li
							key={column.id}
							className="w-full items-center transform transition-colors duration-200 block px-2 py-1 hover:font-bold hover:bg-border hover:rounded-md cursor-pointer"
						>
							<label>
								<input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
								{column.id}
							</label>
						</li>
					))}
				</Dropdown>
			)}
			<div className="flex flex-col">
				<div id="table-scroll" className="overflow-x-auto">
					<div className="inline-block w-full">
						<div
							id="table-scroll"
							className={`overflow-x-auto border border-border rounded-md bg-secondary ${
								height
									? height
									: hideColumn
									? "max-h-[calc(100vh_-_270px)]"
									: pagination
									? "max-h-[calc(100vh_-_200px)]"
									: "lg:max-h-[calc(100vh_-_160px)] max-h-[calc(100vh_-_300px)]"
							}`}
						>
							{isLoading ? (
								<div className="bg-secondary justify-center text-center items-middle content-center p-10 w-full rounded-b-md">
									<PartialLoading />
								</div>
							) : (
								<table
									className="w-full items-center text-sm border-collapse"
									{...getTableProps()}
								>
									<thead className="sticky top-0 bg-secondary ring-1 ring-border z-0">
										{headerGroups.map((headerGroup) => (
											<tr {...headerGroup.getHeaderGroupProps()}>
												{headerGroup.headers.map((column) => (
													<th
														key={column.id}
														className="whitespace-nowrap px-4 py-2 font-bold uppercase tracking-wider"
														scope="col"
													>
														<div className="flex flex-col items-start text-left justify-start">
															<div
																className={`select-none ${
																	column.isSorted
																		? column.isSortedDesc
																			? "sort-desc text-buttonPrimary"
																			: "sort-asc text-buttonPrimary"
																		: ""
																}`}
																{...column.getHeaderProps(
																	column.getSortByToggleProps()
																)}
															>
																{column.Header.length === 0 ? (
																	column.render("Header")
																) : (
																	<div className="flex flex-row gap-2 justify-start text-center items-center align-middle">
																		{column.canGroupBy ? (
																			<span
																				className="flex p-2 w-2 h-2 text-center justify-center items-center align-middle rounded-md hover:bg-gray-300"
																				{...column.getGroupByToggleProps()}
																			>
																				{column.isGrouped ? "+" : "-"}
																			</span>
																		) : null}
																		{column.render("Header")}
																		{column.isSorted ? (
																			column.isSortedDesc ? (
																				<BsSortAlphaUpAlt />
																			) : (
																				<BsSortAlphaDown />
																			)
																		) : column.canSort ? (
																			<BsSortAlphaDown />
																		) : (
																			""
																		)}
																	</div>
																)}
															</div>
															<div>
																{column.canFilter
																	? column.render("Filter")
																	: null}
															</div>
														</div>
													</th>
												))}
											</tr>
										))}
									</thead>
									{rows.length > 0 && (
										<tbody className="break-words" {...getTableBodyProps()}>
											{pagination
												? page.map((row, i) => {
														prepareRow(row);
														return (
															<React.Fragment key={i}>
																<tr
																	className={`odd:bg-primary even:bg-secondary ${
																		trClassName && row.original.overdue < 0
																			? "text-red-600"
																			: trOnClick &&
																			  "cursor-pointer select-none"
																	}`}
																	onDoubleClick={() =>
																		trOnClick && trOnClick(row.original)
																	}
																	{...row.getRowProps()}
																>
																	{row.cells.map((cell) => {
																		return (
																			<td
																				className={`px-4 py-2 align-middle border-l-0 border-r-0 p-2 ${
																					cell.isGrouped
																						? "bg-primary font-bold"
																						: cell.isAggregated
																						? ""
																						: cell.isPlaceholder
																						? "bg-secondary"
																						: cell.row.original.id ===
																						  trClassName
																						? "bg-green-600 text-white"
																						: "bg-transparent"
																				} `}
																				{...cell.getCellProps()}
																			>
																				{cell.isGrouped ? (
																					<div className="odd:bg-primary even:bg-secondary odd:text-primary even:text-secondary">
																						<span
																							{...row.getToggleRowExpandedProps()}
																						>
																							{row.isExpanded ? "-" : "+"}
																						</span>
																						{cell.render("Cell")}(
																						{row.subRows.length})
																					</div>
																				) : cell.isAggregated ? (
																					cell.render("Aggregated")
																				) : cell.isPlaceholder ? null : (
																					cell.render("Cell")
																				)}
																			</td>
																		);
																	})}
																</tr>
																{renderRowSubComponent && row.isExpanded ? (
																	<tr>
																		<td colSpan={visibleColumns.length}>
																			{renderRowSubComponent({
																				row,
																			})}
																		</td>
																	</tr>
																) : null}
															</React.Fragment>
														);
												  })
												: rows.map((row, i) => {
														prepareRow(row);
														return (
															<tr
																className={`odd:bg-primary even:bg-secondary ${
																	trClassName && row.original.is_tax
																		? "text-buttonPrimary"
																		: trOnClick && "cursor-pointer select-none"
																}`}
																onDoubleClick={() =>
																	trOnClick && trOnClick(row.original)
																}
																{...row.getRowProps()}
															>
																{row.cells.map((cell) => {
																	return (
																		<td
																			className={`px-4 py-2 align-middle border-l-0 border-r-0 p-2 ${
																				cell.isGrouped
																					? "bg-primary border-y-border border font-bold text-md text-primary"
																					: cell.isAggregated
																					? "bg-primary border-y-border border font-bold text-md text-primary"
																					: cell.isPlaceholder
																					? "bg-primary border-y-border border font-bold text-md text-primary"
																					: cell.row.original.id === trClassName
																					? "bg-green-600 text-white"
																					: "bg-transparent"
																			} `}
																			{...cell.getCellProps()}
																		>
																			{cell.isGrouped ? (
																				<div className="flex flex-row items-center">
																					<span
																						className="flex p-2 w-2 h-2 mr-1 text-center justify-center items-center align-middle rounded-md hover:bg-gray-300"
																						{...row.getToggleRowExpandedProps()}
																					>
																						{row.isExpanded ? "-" : "+"}
																					</span>
																					<span>
																						{cell.render("Cell")}
																						&nbsp;(
																						{row.subRows.length})
																					</span>
																				</div>
																			) : cell.isAggregated ? (
																				cell.render("Aggregated")
																			) : cell.isPlaceholder ? null : (
																				cell.render("Cell")
																			)}
																		</td>
																	);
																})}
															</tr>
														);
												  })}
											<tr ref={scrollToEnd}></tr>
										</tbody>
									)}
									{footer && rows.length > 0 && (
										<tfoot className="sticky bottom-0 bg-secondary ring-1 ring-border">
											{footerGroups.map((group) => (
												<tr {...group.getFooterGroupProps()}>
													{group.headers.map((column) => (
														<td
															className="whitespace-nowrap px-4 py-2 font-bold uppercase tracking-wider"
															{...column.getFooterProps()}
														>
															{column.render("Footer")}
														</td>
													))}
												</tr>
											))}
										</tfoot>
									)}
								</table>
							)}
							{!rows.length > 0 && !isLoading && (
								<div className="flex bg-secondary justify-center text-center items-middle content-center p-10 w-full rounded-b-xl">
									{t("table.dataNotAvailable")}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{pagination && (
				<div className="flex flex-row flex-wrap lg:justify-start justify-center my-2 items-center">
					<button
						className="h-8 px-4 text-primary border-border border border-r-0 rounded-l-md focus:shadow-outline hover:bg-buttonPrimary hover:text-white disabled:bg-secondary disabled:text-secondary"
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
					>
						{"<<"}
					</button>
					<button
						className="h-8 px-4 text-primary border-border border border-r-0 focus:shadow-outline hover:bg-buttonPrimary hover:text-white disabled:bg-secondary disabled:text-secondary"
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						{"<"}
					</button>
					<button
						className="h-8 px-4 text-primary border-border border border-r-0 focus:shadow-outline hover:bg-buttonPrimary hover:text-white disabled:bg-secondary disabled:text-secondary"
						onClick={() => nextPage()}
						disabled={!canNextPage}
					>
						{">"}
					</button>
					<button
						className="h-8 px-4 text-primary border-border border rounded-r-md focus:shadow-outline hover:bg-buttonPrimary hover:text-white disabled:bg-secondary disabled:text-secondary"
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						{">>"}
					</button>
					{!isMobile && (
						<div>
							<span className="px-2 text-primary">
								{`
                                ${t("table.pagination.page")} ${pageIndex + 1}
                                ${t("table.pagination.from")}
                                ${pageOptions.length}`}
							</span>
							<span>|</span>
							<label className="px-2 text-primary" htmlFor="goToPage">
								{t("table.pagination.goToPage")}
							</label>
							<input
								id="goToPage"
								className="mr-2 border rounded h-5 text-primary bg-secondary text-center"
								defaultValue={pageIndex + 1}
								onChange={(e) => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0;
									gotoPage(page);
								}}
								style={{ width: "20px" }}
							/>
							<span>|</span>
							<label htmlFor="rowInPage" className="px-2 text-primary">
								{t("table.pagination.rowInPage")}
							</label>
							<select
								id="rowInPage"
								className="mr-2 border rounded bg-secondary text-primary"
								value={pageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value));
								}}
							>
								{[10, 20, 30, 40, 50].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
							</select>
							<span>|</span>
							<span className="px-2 text-primary">
								{rows.length} {t("table.pagination.result")}
							</span>
						</div>
					)}
				</div>
			)}
		</>
	);
}

// const EditableCell = ({
// 	value: initialValue,
// 	row: { index },
// 	column: { id },
// 	updateMyData,
// }) => {
// 	const [value, setValue] = useState(initialValue);

// 	const onBlur = () => {
// 		updateMyData(index, id, value);
// 	};

// 	useEffect(() => {
// 		setValue(initialValue);
// 	}, [initialValue]);

// 	return (
// 		<NumberFormat
// 			className=" pl-1 pt-1 pb-1 bg-transparent w-min focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 focus:border-blue-600 ring ring-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400/50"
// 			thousandSeparator={true}
// 			inputMode="numeric"
// 			fixedDecimalScale={true}
// 			decimalScale={2}
// 			value={value}
// 			onValueChange={(values) => {
// 				const { value } = values;
// 				setValue(value);
// 			}}
// 			onBlur={onBlur}
// 		/>
// 	);
// };

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return <input type="checkbox" ref={resolvedRef} {...rest} />;
});

export {
	Table,
	SelectColumnFilter,
	SelectUniqueColumn,
	StatusColumnFilter,
	SliderColumnFilter,
	NumberRangeColumnFilter,
	GlobalFilter,
};
