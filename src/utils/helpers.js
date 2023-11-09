import { useTranslation } from "react-i18next";

export const cls = (input) =>
	input
		.replace(/\s+/gm, " ")
		.split(" ")
		.filter((cond) => typeof cond === "string")
		.join(" ")
		.trim();

export const numberWithComma = (val, delimiter = 0) => {
	return (+val)
		.toLocaleString(undefined, {
			minimumFractionDigits: delimiter,
			maximumFractionDigits: delimiter,
		});
};

export const dateFormatted = (val) => {
	return (
		val.getFullYear() +
		"-" +
		("0" + (val.getMonth() + 1)).slice(-2) +
		"-" +
		("0" + val.getDate()).slice(-2)
	);
};

const addDays = (date, days) => {
	date.setDate(date.getDate() + days);
	return date;
};

export const changesDueDate = (date, topValue) => {
	const dueDateFormatted = dateFormatted(
		addDays(new Date(date), parseInt(topValue))
	);
	return dueDateFormatted;
};

export const Days = () => {
	const [t] = useTranslation();
	const data = [
		{
			id: 0,
			name: t("general.days.sunday"),
		},
		{
			id: 1,
			name: t("general.days.monday"),
		},
		{
			id: 2,
			name: t("general.days.tuesday"),
		},
		{
			id: 3,
			name: t("general.days.wednesday"),
		},
		{
			id: 4,
			name: t("general.days.thursday"),
		},
		{
			id: 5,
			name: t("general.days.friday"),
		},
		{
			id: 6,
			name: t("general.days.saturday"),
		},
	];
	return data;
};
