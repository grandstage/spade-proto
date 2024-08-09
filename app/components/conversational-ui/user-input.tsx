"use client";
import React, { useState } from "react";
import ArrowRight from "../../../public/images/icons/arrow-narrow-right.svg";
import Plus from "../../../public/images/icons/plus.svg";
import Compass from "../../../public/images/icons/compass-03.svg";
import PaperClip from "../../../public/images/icons/paperclip.svg";
import Clipboard from "../../../public/images/icons/clipboard-plus.svg";
import styles from "./chat.module.scss";

interface AttachProps {
  addAttachment: boolean;
  setAddAttachment: (inputValue: boolean) => void;
}

const Attach = ({ addAttachment, setAddAttachment }: AttachProps) => {
  if (addAttachment) {
    return (<div className="flex gap-2 cursor-pointer">
      <div className="border-[1px] border-[#BDBEC2] rounded-md p-2">
      <button
          type="button"
          className="flex items-center gap-1"
          onClick={() => setAddAttachment(!addAttachment)}
        >
          <Plus className={styles.plusIcon} />
          
        </button>
      </div>
      <div className="flex items-center gap-1">
        <Compass className={styles.additionalIcons} />
        <PaperClip className={styles.additionalIcons} />
        <Clipboard className={styles.additionalIcons} />
      </div>
    </div>);
  } else {
    return (
      <div className="flex w-min py-[8px] px-2 rounded-md border-[1px] border-[#BDBEC2] cursor-pointer">
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={() => setAddAttachment(!addAttachment)}
        >
          <Plus className={styles.plusIcon} />
          <span>Attach</span>
        </button>
      </div>
    );
  }

}


interface UserInputProps {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  sendMessage: (messageToSend: string) => void;
}

const UserInput = ({
  inputValue,
  setInputValue,
  sendMessage,
}: UserInputProps) => {
  const [addAttachment, setAddAttachment] = useState<boolean>(false);

  const showAttachOption = false;

  return (
    <div className={styles.chatInputContainer}>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          sendMessage(inputValue);
        }}
        className="flex w-full"
      >
        <div className="flex w-full py-3 px-4 border-[1px] border-[#3A3B41] rounded-md focus:outline-none">
          <div className="flex-1 flex-col">
            <input
              type="text"
              placeholder="Ask us something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`${styles.chatMessage} chat w-full pb-3 focus:outline-none`}
            />
            {showAttachOption && <Attach addAttachment={addAttachment} setAddAttachment={setAddAttachment} />}

          </div>
          <button type="submit" className="text-white p-2 rounded-r-md">
            <ArrowRight className={styles.submitArrowWhite} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInput;
