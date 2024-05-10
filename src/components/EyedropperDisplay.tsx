import React from "react";

import { Position } from "$/types";

import styles from "./EyedropperDisplay.module.scss";

const size = 120;
const center = size / 2;
const bigRadius = size / 2;
const smallRadius = size / 3;
const textMargin = 25;
const textHeight = 25;

export const EyedropperDisplay: React.FC<{
  position: Position;
  color: string;
}> = ({ position, color }) => {
  return (
    <svg
      className={styles.donut}
      width={size}
      height={size}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <defs>
        <mask id="donut">
          <circle cx={center} cy={center} r={center} fill="white" />
          <circle cx={center} cy={center} r={smallRadius} />
        </mask>
      </defs>
      <circle
        fill={color}
        cx={center}
        cy={center}
        r={bigRadius}
        mask="url(#donut)"
      />
      <rect
        x={textMargin}
        y={center - 15}
        width={size - textMargin * 2}
        height={textHeight}
        fill="#111111"
        rx={5}
      />
      <text
        className={styles.hex}
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {color}
      </text>
    </svg>
  );
};
