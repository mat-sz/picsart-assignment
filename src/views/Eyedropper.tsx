import React, { useEffect, useRef, useState } from "react";

import { ColorPreview } from "$/components/ColorPreview";
import { EyedropperDisplay } from "$/components/EyedropperDisplay";
import { EyedropperIcon } from "$/components/EyedropperIcon";
import { colorFromImageData } from "$/helpers/image";
import { Position } from "$/types";

import styles from "./Eyedropper.module.scss";

export const Eyedropper: React.FC<{
  image: HTMLImageElement;
}> = ({ image }) => {
  const [displayedColor, setDisplayedColor] = useState<string>();
  const [isDropper, setIsDropper] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageDataRef = useRef<ImageData>();
  const [position, setPosition] = useState<Position | undefined>(undefined);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx) {
      return;
    }

    ctx.drawImage(image, 0, 0);
    imageDataRef.current = ctx.getImageData(
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      { colorSpace: "srgb" }
    );
  }, [image]);

  const color =
    imageDataRef.current && position
      ? colorFromImageData(imageDataRef.current, position.x, position.y)
      : undefined;

  return (
    <div>
      <div className={styles.tools}>
        <button
          onClick={() => {
            setIsDropper((current) => !current);
            setPosition(undefined);
            setDisplayedColor(undefined);
          }}
        >
          <EyedropperIcon />
        </button>
        {displayedColor && <ColorPreview color={displayedColor} />}
      </div>
      <div className={styles.wrapper}>
        {isDropper && position && color && (
          <EyedropperDisplay color={color} position={position} />
        )}
        <canvas
          ref={canvasRef}
          width={image.naturalWidth}
          height={image.naturalHeight}
          style={{
            cursor: isDropper ? "none" : "default",
          }}
          onPointerMove={(e) => {
            if (isDropper) {
              const rect = canvasRef.current!.getBoundingClientRect();
              setPosition({ x: e.clientX - rect.x, y: e.clientY - rect.y });
            }
          }}
          onPointerDown={() => {
            if (isDropper) {
              setIsDropper(false);
              setDisplayedColor(color);
            }
          }}
        />
      </div>
    </div>
  );
};
