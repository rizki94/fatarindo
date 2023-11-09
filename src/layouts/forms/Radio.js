import React, { forwardRef } from "react";
import { cls } from "../../utils/helpers";

const classes = {
    base: "w-4 h-4 text-buttonPrimary bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
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
    disabled: "opacity-50 cursor-not-allowed",
};

const Radio = forwardRef(
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
            ...props
        },
        ref
    ) => (
        <div className={cls(`${classes.boxSize[boxSize]}`)}>
            <div className="flex items-center">
                <input
                    ref={ref}
                    type="radio"
                    disabled={disabled}
                    className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${disabled && classes.disabled}
                ${className}
            `)}
                    {...props}
                    id="default-radio-1"
                    onChange={() => {}}
                    name="default-radio"
                />
                {label && (
                    <label className="block text-sm ml-2">
                        {label}
                    </label>
                )}
            </div>
        </div>
    )
);

export default Radio;
