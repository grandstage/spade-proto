import React, { memo } from "react";
import ChatStepUser from "./chat-step-user";
import { SessionProvider } from "next-auth/react";

interface UserQueryContainerProps {
  message: string;
  setInputValue: Function;
}

const UserQueryContainer = ({
  message,
  setInputValue,
}: UserQueryContainerProps) => {
  return (
    <>
      <SessionProvider>
        <div className="py-5 md:pl-5">
          <ChatStepUser message={message} setInputValue={setInputValue} />
        </div>
      </SessionProvider>
    </>
  );
};

export default memo(UserQueryContainer);
