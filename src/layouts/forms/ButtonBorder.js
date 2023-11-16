import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { cls } from "../../utils/helpers";

const classes = {
	base: "focus:outline-none transition ease-in-out duration-300",
	disabled: "opacity-50 cursor-not-allowed",
	size: {
		extraSmall: "px-2 py-1 text-xs",
		small: "px-2 py-1 text-sm",
		normal: "h-10 px-4 py-2",
		large: "px-8 py-3 text-lg",
	},
	variant: {
		primary:
			"hover:border-b-4 hover:border-secondary",
		secondary: "",
		success: "",
		danger: "",
		dangerOutline: "",
	},
};

const ButtonBorder = forwardRef(
	(
		{
			children,
			type = "button",
			className,
			id,
			variant = "primary",
			size = "normal",
			disabled = false,
			boxClass,
			buttonLoading,
			...props
		},
		ref
	) => (
		<div className={`my-1 mx-1 ${boxClass || ""}`}>
			<button
				ref={ref}
				disabled={disabled}
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
				{children}
			</button>
		</div>
	)
);

ButtonBorder.propTypes = {
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
	]),
	size: PropTypes.oneOf(["small", "normal", "large", "extraSmall"]),
};

export default ButtonBorder;
