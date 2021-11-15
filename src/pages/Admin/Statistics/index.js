import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";

import "./style.scss";

const Statistics = () => {
  const data = [
    { name: "Page A", sold: 20, revenue: 1000000 },
    { name: "Page B", sold: 10, revenue: 2000000 },
    { name: "Page B", sold: 30, revenue: 4000000 },
  ];

  return (
    <div className="statistics row">
      <div className="chart c-6 lg-12">
        <h3 className="chart__title">Biểu đồ đường</h3>
        <div className="chart__content">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey="sold" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="sold" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="chart c-6 lg-12">
        <h3 className="chart__title">Biểu đồ cột</h3>
        <div className="chart__content">
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                type="number"
                domain={[0, (dataMax) => dataMax * 1.1]}
                dataKey="sold"
                yAxisId="left"
                label={{ value: "sold", position: "insideLeft", fontSize: 14 }}
              />
              <YAxis
                type="number"
                domain={[0, (dataMax) => dataMax * 1.1]}
                dataKey="revenue"
                yAxisId="right"
                orientation="right"
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar yAxisId="left" dataKey="sold" fill="#8884d8">
                <LabelList dataKey="sold" position="top" />
              </Bar>
              <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d">
                <LabelList dataKey="revenue" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
