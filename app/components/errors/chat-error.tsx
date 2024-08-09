import React from "react";
import styles from "./error.module.scss";

interface Props {
  children: React.ReactNode;
}

const ChatError = (props: Props) => {
  const { children } = props;
  return <div className={`${styles.chatError} ${styles.errorContainer}`}>{children}</div>;
};

export default ChatError;
