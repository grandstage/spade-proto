"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import { FollowUpCard } from "./cards";

interface FollowUpProps {
  content: string[];
  sendMessage: (messageToSend: string) => void;
}

const FollowUp = ({ content, sendMessage }: FollowUpProps) => {
  const followUpRef = useRef<null | HTMLDivElement>(null);

  const [showTwo, setShowTwo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setShowTwo(window.innerWidth < 768);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  })

  const handleFollowUpClick = (text: string) => {
    sendMessage(text);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      followUpRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);

    return () => clearTimeout(id);
  }, [content]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        {content.slice(0, Math.min(showTwo ? 2 : 3, content.length)).map((text, index) => (
          <FollowUpCard
            key={index}
            text={text}
            handleFollowUpClick={handleFollowUpClick}
          />
        ))}
      </div>

      <div ref={followUpRef} />
    </>
  );
};

export default memo(FollowUp);
