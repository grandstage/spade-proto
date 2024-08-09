import React, { useState } from "react";
import Sources from "./sources";
import { PulseLoader } from "react-spinners";
import { Avatar } from "@mui/material";
import { ChatStepType } from "./chat-types";
import styles from "./chat.module.scss";
import ThumbsUp from "../../../public/images/icons/thumbs-up.svg";
import ThumbsDown from "../../../public/images/icons/thumbs-down.svg";
import CopyIcon from "../../../public/images/icons/copy-2.svg";
import CheckIcon from "../../../public/images/icons/check.svg";

const showdown = require("showdown");
const converter = new showdown.Converter();

interface ChatStepAssistantProps {
  step: ChatStepType;
}

async function setThumbs(stepId: number, approved: boolean) {
  const url = "/api/chat/step-approved";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stepId: stepId,
      approved: approved,
    }),
  });
}

const ChatStepAssistant = ({ step }: ChatStepAssistantProps) => {

  const [copied, setCopied] = useState<boolean>(false);

  function onCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Avatar
          alt="Spade AI Profile Pic"
          src="./images/spade-ai-logo.png"
          variant="square"
        />
        <div>
          <p style={{ "fontWeight": 700 }}>Spade</p>
          <span className={styles.chatMessage}>
            {(step.content === "Loading..." || step.content === "") ? (
              <PulseLoader color="#9CE0F5" />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(step.content) }} />
            )}
          </span>
        </div>
      </div>
      <div className="pl-[52px]">
        <Sources content={step.related_content} />
      </div>
      <div className="flex justify-end gap-4">
        {step.user_approved !== null && <span className={styles.feedbackText}>Thank you for your feedback!</span>}
        {step.user_approved === null && <ThumbsUp className="cursor-pointer" onClick={() => { setThumbs(step.id, true); }} />}
        {step.user_approved === null && <ThumbsDown className="cursor-pointer" onClick={() => { setThumbs(step.id, false); }} />}
        {!copied && <CopyIcon className="cursor-pointer" onClick={() => { onCopy(step.content) }} />}
        {copied && <CheckIcon className={styles.checkIcon} stroke="#11131C" />}
      </div>
    </div>
  );
};

export default ChatStepAssistant;
