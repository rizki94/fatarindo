import React, { forwardRef } from "react";
import { cls } from "../../utils/helpers";
import Button from "./Button";

const classes = {
	base: "bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-border focus:border-buttonPrimary ring ring-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400/50",
	size: {
		noSize: "",
		small: "px-2 py-1 text-sm",
		normal: "h-10 px-4 py-2",
		large: "px-8 py-3 text-lg",
	},
	boxSize: {
		small: "",
		normal: "my-1 mx-1",
	},
	disabled: "opacity-50 cursor-not-allowed pointer-events-none",
};

const Input = forwardRef(
	(
		{
			label,
			children,
			type = "text",
			disabled = false,
			className,
			size = "normal",
			validation,
			boxSize = "normal",
			button,
			buttonAction,
			input,
			id,
			value,
			inputClass,
			...props
		},
		ref
	) => (
		<div className={cls(`${classes.boxSize[boxSize]}`)}>
			{label && (
				<div className="flex flex-row items-end gap-2">
					{label && (
						<label className="block text-sm mb-1" htmlFor={id ? id : value}>
							{label}
						</label>
					)}
					{button && (
						<Button onClick={buttonAction} size="extraSmall">
							{button}
						</Button>
					)}
					{input && (
						<div className={`text-xs mb-1 ${inputClass || ""}`}>{input}</div>
					)}
				</div>
			)}
			<input
				ref={ref}
				type={type}
				disabled={disabled}
				id={id ? id : value}
				value={value}
				autoComplete="false"
				className={cls(`
                    ${classes.base}
                    ${classes.size[size]}
                    ${disabled && classes.disabled}
                    ${className}
                `)}
				{...props}
			/>
			{validation && (
				<div className="italic text-sm text-red-600">{validation}</div>
			)}
		</div>
	)
);

export default Input;
