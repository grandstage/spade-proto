"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import FeedbackCard from "./feedbackCard";
import { FeedbackCardData } from "./types";

const FilteredFeedbackGrid = ({
  feedbackData,
}: {
  feedbackData: FeedbackCardData[];
}) => {
  const [sortBy, setSortBy] = useState<"date" | "title" | "type">("date");
  const [filterType, setFilterType] = useState<string>("all");

  const uniqueTypes = useMemo(() => {
    const types = new Set(feedbackData.map((item) => item.type));
    return ["all", ...Array.from(types)];
  }, [feedbackData]);

  const sortedAndFilteredData = useMemo(() => {
    let filtered = feedbackData;

    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });
  }, [feedbackData, sortBy, filterType]);

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "date" | "title" | "type")
              }
              className="appearance-none bg-white text-black border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="type">Sort by Type</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none bg-white text-black border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="px-2.5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredData.map((feedback, index) => (
            <FeedbackCard
              key={index}
              title={feedback.title}
              quote={feedback.quote}
              type={feedback.type}
              arr={feedback.arr}
              date={feedback.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilteredFeedbackGrid;
