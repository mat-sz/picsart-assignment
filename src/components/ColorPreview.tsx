import React from "react";

import styles from "./ColorPreview.module.scss";

export const ColorPreview: React.FC<{
  color: string;
}> = ({ color }) => {
  return (
    <div className={styles.colorPreview}>
      <div style={{ backgroundColor: color }} />
      <span>{color}</span>
    </div>
  );
};
