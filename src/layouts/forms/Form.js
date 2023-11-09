import React from "react";

function Container({ className, children }) {
	return (
		<main
			className={`m-4 p-1 flex-1 justify-center items-center overflow-y-auto ${
				className || ""
			}`}
		>
			{children}
		</main>
	);
}

const Form = ({ children, className, onSubmit, ...props }) => {
	return (
		<form onSubmit={onSubmit} className={`${className || ""}`} {...props}>
			{children}
		</form>
	);
};

function ButtonGroup({ children }) {
	return (
		<div className="flex items-center justify-between my-2">{children}</div>
	);
}

function Button({ onClick, type, className, children, form }) {
	return (
		<button
			form={form}
			type={type}
			onClick={onClick}
			className={`bg-accent text-accent py-2 px-4 font-bold rounded hover:shadow-2xl ${
				className || ""
			}`}
		>
			{children}
		</button>
	);
}

function Label({ className, children }) {
	return (
		<label className={`block text-sm font-bold mb-2 ${className || ""}`}>
			{children}
		</label>
	);
}

function Input({ className, type, value, onChange, placeholder }) {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`text-gray-700 py-2 px-3 shadow rounded leading-tight focus: focus:shadow-lg ${
				className || ""
			}`}
		/>
	);
}

function Title({ children, className, ...props }) {
	return (
		<div
			className={`text-2xl my-2 text-center break-words ${className || ""}`}
			{...props}
		>
			{children}
		</div>
	);
}

function InputGroup({ className, children }) {
	return <div className={`my-4 ${className || ""}`}>{children}</div>;
}

function Validation({ className, children }) {
	return (
		<div className={`italic text-sm text-red-600 ${className || ""}`}>
			{children}
		</div>
	);
}

function Select({ className, children, value, onChange, isLoading }) {
	return (
		<>
			{isLoading ? (
				<div className="bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-buttonPrimary focus:ring-blue-400/50 w-60">
					<div className="animate-pulse space-x-4">
						<div className="space-y-6 py-2">
							<div className="space-y-3">
								<div className="h-2 bg-slate-400 rounded"></div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<select
					value={value}
					onChange={onChange}
					className={`bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-buttonPrimary focus:ring-blue-400/50 ${
						className || ""
					}`}
				>
					{children}
				</select>
			)}
		</>
	);
}

function TextArea({ className, value, onChange, ...props }) {
	return (
		<textarea
			rows="4"
			cols="50"
			value={value}
			onChange={onChange}
			className={`bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-buttonPrimary focus:ring-blue-400/50 w-full ${
				className || ""
			}`}
			{...props}
		/>
	);
}

function CheckBox({ className, checked, onChange }) {
	return (
		<input
			type="checkbox"
			className={`w-5 h-5 ${className || ""}`}
			checked={checked}
			onChange={onChange}
		/>
	);
}

function SessionSuccess({ className, children }) {
	return (
		<span
			className={`rounded bg-green-200 text-green-700 px-3 py-2 ${
				className || ""
			}`}
		>
			{children}
		</span>
	);
}

function TableContainer({ children }) {
	return (
		<div className="w-full">
			<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ">
				{children}
			</div>
		</div>
	);
}

function TableSubContainer({ children }) {
	return (
		<div className="rounded-t mb-0 px-4 py-3 border-0 bg-secondary">
			<div className="flex flex-wrap items-center">{children}</div>
		</div>
	);
}

function TableTitle({ children }) {
	return (
		<div className="relative w-full px-2 max-w-full flex-grow flex-1">
			<span className="font-semibold text-2xl text-blueGray-700">
				{children}
			</span>
		</div>
	);
}

function TableButton({ className, children }) {
	return (
		<div className="relative w-full px-2 max-w-full flex-grow flex-1 text-right">
			<button
				className={`font-bold uppercase py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" ${
					className || ""
				}`}
			>
				{children}
			</button>
		</div>
	);
}

function Table({ children }) {
	return (
		<div className="block w-full overflow-x-auto">
			<table className="items-center bg-transparent w-full border-collapse">
				{children}
			</table>
		</div>
	);
}

function Modal({ children }) {
	return (
		<div className="justify-center rounded items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
			<div className="bg-secondary relative w-full my-6 mx-auto max-w-3xl">
				<div className="rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
					{children}
				</div>
			</div>
		</div>
	);
}

function ModalHeader({ children }) {
	return (
		<div className="flex items-start justify-between p-5">
			<h3 className="text-3xl font-semibold">{children}</h3>
		</div>
	);
}

function ModalBody({ children }) {
	return <div className="relative p-6 flex-auto bg-primary">{children}</div>;
}

function ModalFooter({ children }) {
	return (
		<div className="flex items-center justify-end p-6 rounded-b">
			{children}
		</div>
	);
}

function TableHead({ children }) {
	return (
		<thead className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
			<tr>{children}</tr>
		</thead>
	);
}

function TableHeadData({ className, children }) {
	return (
		<th
			scope="col"
			className={`px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider ${
				className || ""
			}`}
		>
			{children}
		</th>
	);
}

function TableBody({ children }) {
	return (
		<tbody className="divide-y divide-gray-200 break-words">
			<tr>{children}</tr>
		</tbody>
	);
}

function TableBodyData({ children, style, className }) {
	return (
		<td
			style={style}
			className={`border-t-0 px-6 align-middle whitespace-nowrap border-l-0 border-r-0 p-4 ${
				className || ""
			}`}
		>
			{children}
		</td>
	);
}

function Loading() {
	return (
		<div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-secondary opacity-75 flex flex-col items-center justify-center">
			<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
		</div>
	);
}

function PartialLoading() {
	return (
		<div className="flex justify-center w-full h-auto items-center align-middle">
			<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
		</div>
	);
}

export {
	Container,
	ButtonGroup,
	Button,
	Input,
	Title,
	Form,
	Label,
	InputGroup,
	Validation,
	Select,
	TextArea,
	CheckBox,
	SessionSuccess,
	Table,
	TableHead,
	TableHeadData,
	TableBody,
	TableBodyData,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Loading,
	TableContainer,
	TableSubContainer,
	TableTitle,
	TableButton,
	PartialLoading,
};
