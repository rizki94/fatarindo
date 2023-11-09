import React, { useEffect, useRef, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

const CustomModal = ({
	footer,
	children,
	title,
	handleClose,
}) => {
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	const [toggle, setToggle] = useState(false);

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

	return (
		<div className="justify-center w-full rounded-md items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
			<div className="relative mx-auto max-w-5xl">
				<div
					ref={wrapperRef}
					onClick={() => setToggle(!toggle)}
					className="rounded-lg bg-primary border border-border relative flex flex-col w-full outline-none focus:outline-none p-2"
				>
					<div className="flex items-start justify-between border-b border-border">
						<h3 className="text-xl font-medium p-1">{title}</h3>
						<VscChromeClose
							className="w-5 h-5 cursor-pointer hover:fill-red-600"
							onClick={handleClose}
						/>
					</div>
					<div
						id="table-scroll"
						className="flex-auto w-full p-1 overflow-y-scroll max-h-[28rem]"
					>
						{children}
					</div>
					<div className="flex items-center justify-end">{footer}</div>
				</div>
			</div>
		</div>
	);
};

export default CustomModal;
