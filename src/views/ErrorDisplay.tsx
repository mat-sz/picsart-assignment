import React from "react";

import styles from "./ErrorDisplay.module.scss";

export const ErrorDisplay: React.FC<{
  error: string;
}> = ({ error }) => {
  return <div className={styles.error}>Error: {error}</div>;
};
