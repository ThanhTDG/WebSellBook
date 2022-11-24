import "./chart.scss";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";

const data = [
	{
		name: "Thứ 2",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Thứ 3",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Thứ 4",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Thứ 5",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Thứ 6",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Thứ 7",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Chủ nhật",
		uv: 3490,
		pv: 4300,
		amt: 2100,
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
						dataKey="uv"
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
