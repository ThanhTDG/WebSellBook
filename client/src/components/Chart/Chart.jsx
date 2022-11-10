import "./chart.scss";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1',
        uv: 6000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '2',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '3',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '4',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '5',
        uv: 2000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '6',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '7',
        uv: 3190,
        pv: 4300,
        amt: 2100,
    },
    {
        name: '8',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: '9',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '10',
        uv: 2490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: '11',
        uv: 1990,
        pv: 4300,
        amt: 2100,
    },
    {
        name: '12',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
];
let colors = [
    { id: 0, name: 'orange' },
    { id: 1, name: 'purple' },
    { id: 2, name: 'red' },
    { id: 3, name: 'blue' },
];

const hlColor ="#ff6c6c"

function Chart() {
    return (
        <div className='chart'>
            <ResponsiveContainer width="100%" aspect={2 / 1}>
                <AreaChart data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={hlColor} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={hlColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke={hlColor} fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart