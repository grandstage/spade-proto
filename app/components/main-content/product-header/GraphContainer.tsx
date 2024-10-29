import React from "react";

const GraphContainer = ({
  title,
  subtitle,
  children,
  options = ["Weekly", "Monthly", "Yearly"],
}) => {
  return (
    <div className="w-full h-[500px] p-6 rounded-md border bg-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <select className="px-3 text-black py-1 border rounded text-sm bg-white">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="h-[400px] w-full">{children}</div>
    </div>
  );
};

export default GraphContainer;
