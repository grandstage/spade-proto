"use client";

import GraphContainer from "./GraphContainer";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { period: "1/1", value1: 3, value2: 2 },
  { period: "1/2", value1: 4, value2: 1 },
  { period: "1/3", value1: 2, value2: 3 },
  { period: "1/4", value1: 1, value2: 0.5 },
  { period: "1/5", value1: 3, value2: 1 },
  { period: "1/6", value1: 1.3, value2: 2 },
  { period: "1/7", value1: 3, value2: 3 },
];

const RevenuePotentialGraph = () => {
  return (
    <GraphContainer title="Revenue Potential">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
          barGap={0}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#D1D5DB"
            vertical={false}
          />
          <XAxis
            dataKey="period"
            axisLine={{ stroke: "#D1D5DB" }}
            tickLine={false}
            tick={{ fill: "#000000", fontSize: 12 }}
          />
          <YAxis
            axisLine={{ stroke: "#D1D5DB" }}
            tickLine={false}
            tick={{ fill: "#000000", fontSize: 12 }}
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4]}
          />
          <Tooltip
            cursor={{ fill: "rgba(229, 231, 235, 0.4)" }}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #D1D5DB",
              borderRadius: "6px",
              padding: "8px",
              color: "#000000",
            }}
          />
          <Bar dataKey="value1" fill="#4F46E5" maxBarSize={40} />
          <Bar dataKey="value2" fill="#EC4899" maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
};

export default RevenuePotentialGraph;
