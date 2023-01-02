import "./chart.scss";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";

const data = [
	{
		name: "Thứ 2",
		VND: 400000,
	},
	{
		name: "Thứ 3",
		VND: 50000,
	},
	{
		name: "Thứ 4",
		VND: 550000,
	},
	{
		name: "Thứ 5",
		VND: 257000,
	},
	{
		name: "Thứ 6",
		VND: 548000,
	},
	{
		name: "Thứ 7",
		VND: 752000,
	},
	{
		name: "Chủ nhật",
		VND: 1200000,
	},
];
let colors = [
	{ id: 0, name: "Ngày" },
	{ id: 1, name: "Tuần" },
	{ id: 2, name: "Tháng" },
	{ id: 3, name: "Năm" },
];

function Chart() {
	return (
		<div className="chart">
			<div className="title">
				<DropdownList
					data={colors}
					dataKey="id"
					textField="name"
					defaultValue={1}
				/>
			</div>
			<ResponsiveContainer
				width="100%"
				aspect={2 / 1}
			>
				<AreaChart
					width={730}
					height={250}
					data={data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient
							id="total"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#8884d8"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="#8884d8"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<XAxis
						dataKey="name"
						stroke="gray"
					/>
					<CartesianGrid
						strokeDasharray="3 3"
						className="chartGrid"
					/>
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="VND"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(#total)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export default Chart;
