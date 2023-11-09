import React, { forwardRef } from "react";
import { cls } from "../../utils/helpers";

const classes = {
	base: "focus:outline-none whitespace-nowrap flex items-center py-2 cursor-default font-bold",
	size: {
		small: "text-sm",
		normal: "h-10",
		large: "py-3 text-lg",
	},
	boxSize: {
		small: "m-0",
		normal: "m-1",
	},
	disabled: "opacity-50 cursor-not-allowed",
};

const Text = forwardRef(
	(
		{
			label,
			children,
			type = "text",
			disabled = false,
			className,
			size = "normal",
			boxSize = "normal",
			validation,
			boxClass,
			...props
		},
		ref
	) => (
		<div
			className={cls(`
            ${classes.boxSize[boxSize]}
        `)}
		>
			{label && (
				<div className="block text-sm mb-1">{label}</div>
			)}
			<div
				ref={ref}
				type={type}
				disabled={disabled}
				className={cls(`
                    ${classes.base}
                    ${classes.size[size]}
                    ${disabled && classes.disabled}
                    ${className}
                `)}
				{...props}
			>
				{children}
			</div>
			<div className="italic text-sm text-red-600">{validation}</div>
		</div>
	)
);

export default Text;
