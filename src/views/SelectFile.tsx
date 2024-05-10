import React from "react";

import styles from "./SelectFile.module.scss";

export const SelectFile: React.FC<{ onChange?: (file?: File) => void }> = ({
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <span>
          Drag & drop an image file here or click this area to choose.
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            onChange?.(file);
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
};
