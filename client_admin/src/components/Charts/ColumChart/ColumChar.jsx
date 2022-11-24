import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
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
	labels: ["Sách 1 ", "Sách 2", "Sách 3", "Sách 4", "Answered", "Abandoned", "Waiting"],
	datasets: [
		{
			data: [90, 80, 75, 65, 50, 46, 44, 40],
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
