import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

const Dropdown = ({ data, children, label, className, ...props }) => {
	const [t] = useTranslation();
	function useOutsideAlerter(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setToggle(false);
				}
			}
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	const [toggle, setToggle] = useState(false);
	let options = [];
	if (data) {
		options = data.map((data) => {
			return (
				<li
					className="cursor-pointer items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-buttonPrimary"
					{...props}
				>
					{data.id}
				</li>
			);
		});
	}
	return (
		<div
			className={`relative w-32 ${className || ""}`}
			ref={wrapperRef}
		>
			<button
				className={`inline-block border-border border text-sm px-2 py-1 w-32 ${
					toggle ? "rounded-t-xl" : "rounded-md"
				}`}
				onClick={() => setToggle(!toggle)}
			>
				{label && label}
			</button>
			{toggle && (
				<ul id='table-scroll' className="h-64 overflow-y-scroll w-full text-sm block bg-primary absolute border-border border rounded-b-xl z-10">
					{data && options}
					{children && children}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
