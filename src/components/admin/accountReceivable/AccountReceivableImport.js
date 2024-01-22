import React, { useState } from "react";
import {
	Button,
	Container,
	Input,
	Select,
	Text,
} from "../../../layouts/forms/Index";
import { useTranslation } from "react-i18next";
import useDocTitle from "../../../hooks/useDocTitle";
import * as XLSX from "xlsx";
import { useToast } from "../../../hooks/Index";
import { dateFormatted } from "../../../utils/helpers";
import { apiClient } from "../../../services/api";

const AccountReceivableImport = () => {
	const toast = useToast();
	const [t] = useTranslation();
	const title = t("sidebar.accountReceivableImport");
	useDocTitle(title);
	const [excel, setExcel] = useState();
	const [cols, setCols] = useState();
	const initialColumn = {
		invoice: "0",
		date: "0",
		due_date: "0",
		outlet_code: "0",
		outlet_name: "0",
		amount: "0",
	};
	const [column, setColumn] = useState(initialColumn);
	const [importData, setImportData] = useState();
	const [exportName, setExportName] = useState();
	const [fileName, setFileName] = useState("");
	const [rowStart, setRowStart] = useState(2);

	const make_cols = (refstr, header) => {
		let R = XLSX.utils.decode_range(refstr).s.r + rowStart - 1;
		const name = Object.keys(
			XLSX.utils.sheet_to_json(header, { raw: false, range: R })[0]
		);
		let o = [],
			C = XLSX.utils.decode_range(refstr).e.c + 1;
		for (var i = 0; i < C; ++i)
			o[i] = {
				id: i + 1,
				cell: XLSX.utils.encode_col(i),
				name: name[i],
			};
		return o;
	};

	const handleImport = (file) => {
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_json(ws, {
				header: 1,
				range: rowStart,
				blankrows: false,
			});
			setExcel(data);
			setFileName(file.name);
			setCols(make_cols(ws["!ref"], ws));
		};
		if (rABS) reader.readAsBinaryString(file);
		else reader.readAsArrayBuffer(file);
	};

	const handleChangeColumn = (e) => {
		const newColumn = { ...column };
		newColumn[e.target.id] = e.target.value;
		setColumn(newColumn);
		changeImportData(newColumn);
	};

	const exportTemplate = () => {
		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(column)
		)}`;
		const link = document.createElement("a");
		link.href = jsonString;
		link.download = exportName + ".json";

		link.click();
	};

	const ExcelDateToJSDate = (serial) => {
		var utc_days = Math.floor(serial - 25569);
		var utc_value = utc_days * 86400;
		var date_info = new Date(utc_value * 1000);

		var fractional_day = serial - Math.floor(serial) + 0.0000001;

		var total_seconds = Math.floor(86400 * fractional_day);

		var seconds = total_seconds % 60;

		total_seconds -= seconds;

		var hours = Math.floor(total_seconds / (60 * 60));
		var minutes = Math.floor(total_seconds / 60) % 60;
		return new Date(
			date_info.getFullYear(),
			date_info.getMonth(),
			date_info.getDate(),
			hours,
			minutes,
			seconds
		);
	};

	const DateValues = (dateValues) => {
		const date = dateValues.substring(0, 2);
		const month = dateValues.substring(3, 5);
		const year = dateValues.substring(6, 11);
		return new Date(year, month - 1, date);
	};

	const changeImportData = (col) => {
		const newData = excel.map((row) => ({
			invoice: row[parseInt(col.invoice) - 1],
			date: dateFormatted(DateValues(row[parseInt(col.date) - 1])),
			due_date: dateFormatted(DateValues(row[parseInt(col.due_date) - 1])),
			outlet_code: row[parseInt(col.outlet_code) - 1],
			outlet_name: row[parseInt(col.outlet_name) - 1],
			amount: row[parseInt(col.amount) - 1],
		}));
		setImportData(newData);
	};

	const importTemplate = (file) => {
		const fileReader = new FileReader();
		fileReader.readAsText(file, "UTF-8");
		fileReader.onload = (e) => {
			setColumn(JSON.parse(e.target.result));
			changeImportData(JSON.parse(e.target.result));
		};
	};

	const allPropsNull = (object) => {
		return Object.values(object).every((value) => value !== "0");
	};

	const [submitLoading, setSubmitLoading] = useState(false);

	const handleConvert = () => {
		setSubmitLoading(true);
		apiClient
			.post("api/account_receivable/convert", {
				data: importData,
			})
			.then((response) => {
				if (response.data.status === 200) {
					toast("success", t("toast.update.success"));
					setSubmitLoading(false);
				} else {
					let errorMsg = {};
					errorMsg = response.data.validateErr;
					const values = Object.values(errorMsg);
					for (let i = 0; i < values.length; i++) {
						toast("error", values[i]);
						setSubmitLoading(false);
					}
				}
			});
	};

	return (
		<Container
			title={title}
			navigation1={
				<div className="flex flex-row">
					<Button
						variant="danger"
						onClick={handleConvert}
						disabled={!allPropsNull(column)}
						buttonLoading={submitLoading}
					>
						{t("general.import")}
					</Button>
				</div>
			}
		>
			<div className="flex flex-row items-center">
				<div className="flex flex-row items-end">
					<Input
						className="w-24"
						label="Row Start"
						type="number"
						value={rowStart}
						onChange={(e) => {
							if (e.target.value > 0) {
								setRowStart(parseInt(e.target.value));
							}
						}}
						disabled={excel}
					/>
					<div>
						<Input
							type="file"
							accept=".xlsx,.xls"
							onChange={(e) => {
								const files = e.target.files;
								if (files && files[0]) handleImport(files[0]);
							}}
							className="w-24 my-1 absolute opacity-0 rounded-md h-10 px-4 py-2 hover:cursor-pointer"
						/>
						<Button variant="success" className="bg-cover">
							{t("general.selectFile")}
						</Button>
					</div>
					<Text>{fileName}</Text>
				</div>
			</div>
			<div className="flex flex-row items-end">
				<Input
					label={t("Nama File")}
					value={exportName}
					onChange={(e) => setExportName(e.target.value)}
					disabled={!fileName}
				/>
				<Button onClick={exportTemplate} disabled={!exportName}>
					{t("general.exportColumn")}
				</Button>
			</div>
			<div>
				<Input
					type="file"
					accept=".json"
					onChange={(e) => {
						const files = e.target.files;
						if (files && files[0]) importTemplate(files[0]);
					}}
					className="w-32 opacity-0 my-1 absolute rounded-md h-10 px-4 py-2 hover:cursor-pointer"
					disabled={!fileName}
				/>
				<Button className="bg-cover" disabled={!fileName}>
					{t("general.importColumn")}
				</Button>
			</div>
			<div className="flex flex-row flex-wrap mb-4">
				<Select
					defaultOption
					label={t("element.invoice")}
					data={cols}
					value={column.invoice}
					id="invoice"
					onChange={(e) => handleChangeColumn(e)}
					disabled={!excel}
				/>
				<Select
					defaultOption
					label={t("general.date")}
					data={cols}
					value={column.date}
					id="date"
					onChange={(e) => handleChangeColumn(e)}
					disabled={!excel}
				/>
				<Select
					defaultOption
					label={t("general.dueDate")}
					data={cols}
					value={column.due_date}
					id="due_date"
					onChange={(e) => handleChangeColumn(e)}
					disabled={!excel}
				/>
				<Select
					defaultOption
					label={t("element.outletName")}
					data={cols}
					value={column.outlet_name}
					id="outlet_name"
					onChange={(e) => handleChangeColumn(e)}
					disabled={!excel}
				/>
				<Select
					defaultOption
					label={t("element.outletCode")}
					data={cols}
					value={column.outlet_code}
					id="outlet_code"
					onChange={(e) => handleChangeColumn(e)}
					disabled={!excel}
				/>
				<Select
					defaultOption
					label={t("element.amount")}
					data={cols}
					value={column.amount}
					id="amount"
					onChange={(e) => handleChangeColumn(e)}
					disabled={!excel}
				/>
			</div>
		</Container>
	);
};

export default AccountReceivableImport;
