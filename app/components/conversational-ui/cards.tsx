"use client";
import React, { useState } from "react";
import Image from "../utils/image_with_fallback";
import ArrowRight from "../../../public/images/icons/arrow-narrow-right.svg";
import styles from "./chat.module.scss";

interface FollowUpCardProps {
  text: string;
  handleFollowUpClick: (text: string) => void;
}

interface SuggestionsCardProps {
  text: string;
  sendMessage: (messageToSend: string) => void;
}

interface SourceCardProps {
  image_url: string | null;
  title: string;
  index: number;
  url: string | null;
  source_name: string | null;
}

interface SourceCardContentProps {
  image_url: string | null;
  title: string;
  index: number;
  source_name: string | null;
}

const cardStyles =
  "flex cursor-pointer max-h-[85px] border-[1px] border-[#3A3B41] rounded-md p-2 gap-1 hover:bg-[#3A3B41] hover:text-[#AADFF5]";

const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const FollowUpCard = ({
  text,
  handleFollowUpClick,
}: FollowUpCardProps) => {
  return (
    <div className={cardStyles} onClick={() => handleFollowUpClick(text)}>
      <span className="flex items-center text-sm">
        {truncateText(text, 100)}
      </span>
      <div className="flex items-center justify-center">
        <ArrowRight className={styles.arrowGrey} />
      </div>
    </div>
  );
};

export const SuggestionsCard = ({
  text,
  sendMessage,
}: SuggestionsCardProps) => {
  return (
    <div onClick={() => sendMessage(text)} className={cardStyles}>
      <span>{truncateText(text, 100)}</span>
      <div className="flex items-center justify-center">
        <ArrowRight className={styles.arrowGrey} />
      </div>
    </div>
  );
};


const SourceCardContent = ({ image_url, title, source_name, index }: SourceCardContentProps) => {
  return (<div className="flex gap-2" key={index}>
    <Image
      src={image_url || "/images/placeholder-image.png"}
      alt="image"
      width={50}
      height={50}
      className="rounded-md"
    />

    <span className="font-[500]">
      &quot;{index + 1}. {truncateText(title, 100)}&quot; {source_name && "| " + source_name}
    </span>

  </div>);
}


const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  }
  catch (e) {
    return false;
  }
}

export const SourceCard = ({ image_url, title, url, index, source_name }: SourceCardProps) => {
  if (url != null && isValidUrl(url)) {
    return (<a className="hover:underline" href={url} target="_blank">
      <SourceCardContent image_url={image_url} title={title} source_name={source_name} index={index} />
    </a>);
  }

  return <SourceCardContent image_url={image_url} title={title} source_name={source_name} index={index} />;
};
