import dayjs from "dayjs";
import { constants } from "~/stores";

export const displayMoney = (value, showUnit = true) => {
	const formatterNUnit = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	});
	const formatter = new Intl.NumberFormat("vi-VN");
	if (showUnit) return formatterNUnit.format(value);
	else return formatter.format(value);
};
export const displaySex = (sex) => {
	if (sex) return constants.MALE;
	else return constants.FE_MALE;
};

export const displayTime = (date) => {
	if (!date) return "";
	const dayConvert = dayjs(date).format("HH:mm DD/MM/YYYY");
	return dayConvert;
};
export const displayDay = (date) => {
	if (!date) return "";
	const dayConvert = dayjs(date).format("DD/MM/YYYY");
	return dayConvert;
};
export const displayAddress = (address) => {
	const orderDisplay = ["ward", "district", "region"];
	let string = `${address.address ? `${address.address}, ` : ""}`;
	orderDisplay.forEach((type) => {
		if (address[type]) {
			string += `${address[type] ? `${address[type]}, ` : ""}`;
		}
	});

	return string.slice(0, string.length - 2);
};
