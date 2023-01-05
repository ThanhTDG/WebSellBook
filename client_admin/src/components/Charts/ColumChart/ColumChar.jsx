import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	x: {
		ticks: {
			callback: function (value, index, ticks_array) {
				let characterLimit = 12;
				let label = this.getLabelForValue(value);
				if (label.length >= characterLimit) {
					return (
						label
							.slice(0, label.length)
							.substring(0, characterLimit - 1)
							.trim() + "..."
					);
				}
				return label;
			},
		},
	},
	indexAxis: "y",
	elements: {
		bar: {
			borderWidth: 2,
		},
	},
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
			text: "General SMS - 150",
		},
		layout: {
			padding: 16,
		},
		datalabels: {
			font: {
				weight: "bold",
			},
			align: "end",
			anchor: "end",
			formatter: function (value, context) {
				return context.chart.formattedData[context.dataIndex];
			},
		},
	},
};

export const data = {
	labels: [
		"Công Chúa Ma Cà Rồng Quyề...",
		"Chuyện Tình Thanh Xuân Bi...",
		"Liệu Có Sai Lầm Khi Tìm K...",
		"Fate/Zero 5 - Mạch Ngầm B...",
		"Miền Đất Hứa - The Promis...",
		"Lời Nói Đùa 2 - Kẻ Siết C...",
		"Cuộc Chiến Siêu Nhiên Giữ...",
		"Lịch Sử Văn Học Thế Giới ...",
		"Nho Giáo",
		"Nhà văn và Cuộc sống số 8...",
	],
	datasets: [
		{
			data: [96, 94, 92, 90, 88, 86, 84, 82, 80, 78],
			backgroundColor: ["gray", "blue", "yellow"],
		},
	],
};

export function ColumChar() {
	return (
		<Bar
			options={options}
			data={data}
		/>
	);
}
export default ColumChar;
