import React, { memo } from "react";
import { SessionProvider } from "next-auth/react";

import ChatStepAssistant from "./chat-step-assistant";
import ChatStepUser from "./chat-step-user";

import { ChatStepType } from "./chat-types";

interface MessageHandlerProps {
  step: ChatStepType;
  setInputValue: Function;
}

const MessageHandler = ({ step, setInputValue }: MessageHandlerProps) => {
  return (
    <>
      <SessionProvider>
        <div className="py-5 md:pl-5">
          {step.role == "user" ? (
            <ChatStepUser
              message={step.content}
              setInputValue={setInputValue}
            />
          ) : (
            <ChatStepAssistant step={step} />
          )}
        </div>
      </SessionProvider>
    </>
  );
};

export default memo(MessageHandler);
