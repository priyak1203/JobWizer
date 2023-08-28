import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip contentStyle={{ color: '#333' }} />
        <Area type="monotone" dataKey="count" stroke="#a564a4" fill="#c58cc5" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
