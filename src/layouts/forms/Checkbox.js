const Checkbox = ({ label, checked, onChange, id, disabled, ...props }) => {
	const toggleClass = "transform translate-x-5";
	return (
		<div
			className={`m-1 ${
				disabled && "opacity-50 cursor-not-allowed pointer-events-none"
			}`}
		>
			{label && <div className="block text-sm mb-1">{label}</div>}
			<div className="h-10 flex items-center">
				<div
					className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
						checked ? "bg-buttonPrimary" : "bg-gray-500"
					}`}
					id={id ? id : label}
					checked={checked}
					onClick={onChange}
					{...props}
				>
					<div
						className={
							"bg-border h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out" +
							(checked ? toggleClass : null)
						}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Checkbox;
