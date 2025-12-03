import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type ChartPoint = {
  day: string;
  totalTasks: number;
  completed: number;
  inprogress?: number;
  overdue?: number;
  todo?: number;
};

type ProductivityChartProps = {
  data: ChartPoint[];
};

const ProductivityChart: React.FC<ProductivityChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width={'100%'} height={256}>
      <LineChart data={data}>
        {/* task line  */}
        <Line
          type="monotone"
          dataKey="totalTasks"
          name="Total Tasks"
          stroke="#284cff"
          strokeWidth={2}
          dot={{ r: 4 }}
        />

        <CartesianGrid stroke="#e8e8e8" strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fill: '#949494' }} />
        <Tooltip />
        <YAxis tick={{ fill: '#949494' }} />

        {/* Completed tasks line */}

        <Line
          type="monotone"
          dataKey="completed"
          name="Completed"
          stroke="#00c853"
          strokeWidth={2}
          dot={{ r: 4 }}
        />

        {/* In-progress tasks line */}
        <Line
          type="monotone"
          dataKey="inprogress"
          name="Inprogress"
          stroke="#ff9800"
          strokeWidth={2}
          dot={{ r: 4 }}
        />

        {/* Overdue tasks line */}
        <Line
          type="monotone"
          dataKey="overdue"
          name="Overdue"
          stroke="#f44336"
          strokeWidth={2}
          dot={{ r: 4 }}
        />

        {/* To-do tasks line */}
        <Line
          type="monotone"
          dataKey="todo"
          name="Todo"
          stroke="#9e9e9e"
          strokeWidth={2}
          dot={{ r: 4 }}
        />

        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={9}
          wrapperStyle={{ paddingRight: 20 }}
          formatter={(value) => (
            <span className="text-main font-xs font-semibold">{value}</span>
          )}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(ProductivityChart);
