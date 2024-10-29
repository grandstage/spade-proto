import React from "react";
import { FeedbackCardData } from "./types";

const StatusBadge = ({ type }: { type: FeedbackCardData['type'] }) => {
    const getBadgeStyles = () => {
        switch (type) {
            case 'Customer':
                return 'bg-green-100 text-green-800';
            case 'Prospect':
                return 'bg-yellow-100 text-yellow-800';
            case 'Opportunity':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-md ${getBadgeStyles()}`}>
            {type}
        </span>
    );
};

export default StatusBadge;