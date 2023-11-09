import React, { forwardRef } from "react";
import NumberFormat from "react-number-format";
import { cls } from "../../utils/helpers";
import Button from "./Button";

const classes = {
  base: "h-10 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-border hover:border-gray-800 dark:hover:border-gray-200 focus:border-buttonPrimary ring ring-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400/50",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "px-4 py-2",
    large: "px-8 py-3 text-lg",
  },
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
};

const locale = navigator.language;

const NumberInput = forwardRef(
  (
    {
      label,
      children,
      type = "text",
      disabled = false,
      className,
      size = "normal",
      validation,
      boxClass,
      button,
      id,
      value,
      buttonAction,
      input,
      inputClass,
      ...props
    },
    ref
  ) => (
    <div className="my-1 mx-1">
      {label && (
        <div className="flex flex-row items-end justify-between">
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
            <div className={`text-sm mb-1 ${inputClass || ""}`}>{input}</div>
          )}
        </div>
      )}
      <NumberFormat
        inputMode="numeric"
        fixedDecimalScale={true}
        decimalScale={2}
        id={id ? id : value}
        thousandSeparator={locale === "id" ? "." : ","}
        decimalSeparator={locale === "id" ? "," : "."}
        value={value}
        disabled={disabled}
        className={cls(`
                    ${classes.base}
                    ${classes.size[size]}
                    ${disabled && classes.disabled}
                    ${className}
                `)}
        {...props}
      />
    </div>
  )
);

export default NumberInput;
