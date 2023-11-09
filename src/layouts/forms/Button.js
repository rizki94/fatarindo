import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { cls } from "../../utils/helpers";

const classes = {
	base: "focus:outline-none transition ease-in-out duration-300 rounded-md whitespace-nowrap",
	size: {
		extraSmall: "px-2 py-1 text-xs",
		small: "px-2 py-1 text-sm",
		normal: "h-10 px-4 py-2",
		large: "px-8 py-3 text-lg",
	},
	boxSize: {
		small: "",
		normal: "m-1",
	},
	variant: {
		primary:
			"border border-transparent bg-buttonPrimary hover:bg-sky-800 text-white focus:bg-sky-800 focus:ring-2 focus:ring-opacity-50 focus:ring-sky-500",
		primaryOutline:
			"border text-buttonPrimary border-buttonPrimary hover:bg-buttonPrimary hover:text-white focus:ring-2 focus:ring-buttonPrimary focus:ring-opacity-50",
		indigo:
			"border border-transparent bg-indigo-600 hover:bg-indigo-800 text-white focus:bg-indigo-800 focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500",
		secondary:
			"border border-transparent bg-gray-600 hover:bg-gray-800 text-white focus:bg-gray-800 focus:ring-2 focus:ring-opacity-50 focus:ring-gray-500",
		success:
			"border border-transparent bg-green-600 hover:bg-green-800 text-white focus:bg-green-800 focus:ring-2 focus:ring-opacity-50 focus:ring-green-500",
		danger:
			"border border-transparent bg-red-600 hover:bg-red-800 text-white focus:bg-red-800 focus:ring-2 focus:ring-opacity-50 focus:ring-red-500",
		dangerOutline:
			"border text-red-500 border-red-500 hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-500 focus:ring-opacity-50",
		yellow:
			"border border-transparent bg-yellow-600 hover:bg-yellow-800 text-white focus:bg-yellow-800 focus:ring-2 focus:ring-opacity-50 focus:ring-yellow-500",
	},
	disabled: "opacity-50 cursor-not-allowed",
};

const Button = forwardRef(
	(
		{
			children,
			type = "button",
			className,
			id,
			variant = "primary",
			size = "normal",
			disabled = false,
			boxSize = "normal",
			buttonLoading = false,
			...props
		},
		ref
	) => (
		<div className={cls(`${classes.boxSize[boxSize]}`)}>
			<button
				ref={ref}
				disabled={disabled || buttonLoading}
				type={type}
				className={cls(`
                    ${classes.base}
                    ${classes.size[size]}
                    ${classes.variant[variant]}
                    ${disabled && classes.disabled}
                    ${className}
                `)}
				{...props}
			>
				<div
					className="flex justify-center items-center align-middle text-center flex-row"
					id={id}
				>
					{buttonLoading && (
						<div className="flex flex-row justify-center items-center mr-2">
							<div className="loaderButton ease-linear rounded-full border-2 border-t-2 border-gray-200 h-4 w-4 mr-2" />
							|
						</div>
					)}
					{children}
				</div>
			</button>
		</div>
	)
);

Button.propTypes = {
	children: PropTypes.node.isRequired,
	submit: PropTypes.oneOf(["submit", "button"]),
	className: PropTypes.string,
	disabled: PropTypes.bool,
	variant: PropTypes.oneOf([
		"primary",
		"secondary",
		"danger",
		"dangerOutline",
		"success",
		"indigo",
		"yellow",
	]),
	size: PropTypes.oneOf(["small", "normal", "large", "extraSmall"]),
};

export default Button;
