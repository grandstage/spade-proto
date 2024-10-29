"use client";

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
import GraphContainer from "./GraphContainer";

const data = [
  { value: 12, date: "July-1-24" },
  { value: 25, date: "Aug-1-24" },
  { value: 5, date: "Sept-1-24" },
  { value: 5, date: "Oct-1-24" },
];

const formatValue = (value: number): string => {
  return `${value}M`;
};

const MarketSentimentGraph = () => {
  return (
    <GraphContainer
      title="Market Sentiment"
      subtitle="Monthly market sentiment analysis"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
          <XAxis
            dataKey="date"
            axisLine={{ stroke: "#D1D5DB" }}
            tick={{ fill: "#000000", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            axisLine={{ stroke: "#D1D5DB" }}
            tick={{ fill: "#000000", fontSize: 12 }}
            tickLine={false}
            tickFormatter={formatValue}
          />
          <Tooltip
            formatter={(value) => [`${value}M`, "Value"]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #D1D5DB",
              padding: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              color: "#000000",
            }}
            cursor={{ fill: "rgba(229, 231, 235, 0.4)" }}
          />
          <Bar
            dataKey="value"
            fill="#4F46E5"
            radius={[0, 0, 0, 4]} 
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
};

export default MarketSentimentGraph;
