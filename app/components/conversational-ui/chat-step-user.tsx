"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import styles from "./chat.module.scss";
import EditIcon from "../../../public/images/icons/edit.svg";

interface ChatStepUserProps {
  message: string;
  setInputValue: Function;
}

const ChatStepUser = ({ message, setInputValue }: ChatStepUserProps) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";
  return (
    <div className="flex  justify-between items-end">
      <div className="flex gap-3 items-center justify-between">
        <Avatar sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}>
          {isLoading ? "HI" : user?.name?.[0].toUpperCase()}
        </Avatar>
        <div>
          <p style={{ fontWeight: 700 }}>You</p>
          <p className={styles.chatMessage}>{message}</p>
        </div>
      </div>
      <EditIcon
        onClick={() => setInputValue(message)}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ChatStepUser;
