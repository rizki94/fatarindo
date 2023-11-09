import { t } from "i18next";
import React from "react";
import { cls } from "../../utils/helpers";

const classes = {
  base: "bg-secondary min-w-fit focus:outline-none rounded-md border border-border focus:border-blue-600 ring ring-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400/50",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "h-10 px-2 py-2",
    large: "px-8 py-3 text-lg",
  },
  boxSize: {
    small: "",
    normal: "m-1",
  },
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
};

const Select = ({
  data,
  label,
  className,
  defaultOption,
  isLoading,
  size = "normal",
  validation,
  children,
  hidden,
  boxSize = "normal",
  optionRef,
  disabledOption,
  id,
  value,
  disabled = false,
  ...props
}) => {
  let options = [];
  if (data) {
    options = data.map((data) => {
      return (
        <option
          className={data.isDisabled ? "text-red-500 bg-border" : ""}
          disabled={data.isDisabled}
          key={data.id}
          value={data.id}
        >
          {data.name ? data.name : data.id}
        </option>
      );
    });
  }

  return (
    !hidden && (
      <div className={cls(`${classes.boxSize[boxSize]}`)}>
        {label && (
          <label className="block text-sm mb-1" htmlFor={id ? id : label}>
            {label}
          </label>
        )}
        {isLoading ? (
          <div className="h-10 w-32 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-400 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <select
              ref={optionRef}
              disabled={disabled}
              id={id ? id : label}
              value={value}
              className={cls(`
                        ${classes.base}
                        ${classes.size[size]}
                        ${disabled && classes.disabled}
                        ${className || ""}
                    `)}
              {...props}
            >
              {defaultOption && (
                <option value={typeof defaultOption === "string" ? "" : 0}>
                  {typeof defaultOption === "string"
                    ? defaultOption
                    : t("general.select")}
                </option>
              )}
              {data && options}
              {children && children}
            </select>
            <div className="italic text-sm text-red-600">{validation}</div>
          </>
        )}
      </div>
    )
  );
};

export default Select;
