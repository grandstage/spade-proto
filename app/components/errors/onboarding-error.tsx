import React from "react";
import styles from "./error.module.scss"

interface Props {
  children: React.ReactNode;
}

const OnboardingError = (props: Props) => {
  const { children } = props;
  return <div className={styles.errorContainer}>{children}</div>;
};

export default OnboardingError;
