"use client";
import React, { useEffect, useState } from "react";
import { SuggestionsCard } from "./cards";

interface SuggestionsProps {
  content: string[];
  sendMessage: (messageToSend: string) => void;
}

const Suggestions = ({ content, sendMessage }: SuggestionsProps) => {
  const [showTwo, setShowTwo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setShowTwo(window.innerWidth < 768);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {content
        .slice(0, Math.min(showTwo ? 2 : 3, content.length))
        .map((text, index) => (
          <SuggestionsCard key={index} text={text} sendMessage={sendMessage} />
        ))}
    </div>
  );
};

export default Suggestions;
