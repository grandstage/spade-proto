import React from "react";
import { MessageSquare } from "lucide-react";
import { FeedbackCardData } from "./types";
import StatusBadge from "./statusBadge";

const FeedbackCard = ({
  title,
  quote,
  type,
  arr,
  date,
}: FeedbackCardData): JSX.Element => {
  return (
    <div className="mx-2.5 bg-white border border-gray-500 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <StatusBadge type={type} />
      </div>

      <p className="text-gray-600 text-sm mb-4">"{quote}"</p>

      <div className="flex justify-between items-center">
        <div className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-md border border-blue-200">
          {arr}
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
    </div>
  );
};

export default FeedbackCard;
