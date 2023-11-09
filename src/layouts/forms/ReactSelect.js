import { useMemo } from "react";
import Select, { createFilter } from "react-select";
import escapeRegExp from "lodash/escapeRegExp";
import { useState } from "react";

const ReactSelect = ({
	getOptionLabel,
	selectRef,
	selected,
	label,
	isLoading,
	options,
	validation,
	className,
	optionLabel,
	filterOption,
	extraFilter,
	...props
}) => {
	const [inputValue, setInputValue] = useState(true);
	const customFilter = (option, searchText) => {
		createFilter({ ignoreAccents: false });
		if (option.data.name.toLowerCase().includes(searchText.toLowerCase())) {
			return true;
		} else {
			return false;
		}
	};

	const MAX_DISPLAYED_OPTIONS = 100;

	const filteredOptions = useMemo(() => {
		const matchByStart = [];
		const matchByInclusion = [];
		if (!inputValue) {
			return options;
		}
		const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
		const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");

		for (const option of options) {
			if (
				regByInclusion.test(option.name) ||
				(extraFilter && regByInclusion.test(option[extraFilter]))
			) {
				if (
					regByStart.test(option.name) ||
					(extraFilter && regByStart.test(option[extraFilter]))
				) {
					matchByStart.push(option);
				} else {
					matchByInclusion.push(option);
				}
			}
		}
		return [...matchByStart, ...matchByInclusion];
	}, [inputValue]);

	const slicedOptions = useMemo(
		() => filteredOptions.slice(0, MAX_DISPLAYED_OPTIONS),
		[filteredOptions]
	);

	return (
		<div className="my-1 mx-1">
			{label && (
				<label className="block text-sm mb-1">{label}</label>
			)}
			<Select
				ref={selectRef}
				styles={{
					option: (styles, { data, isFocused, isSelected }) => {
						return {
							...styles,
							backgroundColor:
								data?.is_tax && isFocused
									? "#3b82f6 !important"
									: data?.is_tax && isSelected
									? "#2563eb !important"
									: undefined,
							color:
								data?.is_tax && isFocused
									? "white !important"
									: data?.is_tax && isSelected
									? "white !important"
									: data?.is_tax
									? "#2563eb !important"
									: undefined,
						};
					},
				}}
				onBlur={(e) => {
					if (e.target.autocomplete) {
						e.target.autocomplete = "off";
					}
				}}
				captureMenuScroll={false}
				className={`my-react-select-container ${className || ""}`}
				classNamePrefix="my-react-select"
				getOptionLabel={
					getOptionLabel || optionLabel
						? optionLabel
						: (option) => `${option.name}`
				}
				value={options.filter((option) => option.parent_id === selected)}
				isOptionSelected={(option) => {
					return selected === option.id ? true : false;
				}}
				onInputChange={(value) => setInputValue(value)}
				options={slicedOptions}
				isLoading={isLoading}
				isOptionDisabled={(option) => option.isDisabled}
				filterOption={filterOption || customFilter}
				noOptionsMessage={() => null}
				menuPosition="fixed"
				isSearchable
				isClearable
				menuShouldBlockScroll
				{...props}
			/>
		</div>
	);
};

export default ReactSelect;
