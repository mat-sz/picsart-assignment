export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", (e) => {
      const url = e.target?.result;
      if (typeof url === "string") {
        resolve(url);
      } else {
        reject(
          new Error(`FileReader load: expected "string", got "${typeof url}".`)
        );
      }
    });

    fileReader.addEventListener("error", (e) => {
      reject(e.target?.error);
    });

    fileReader.readAsDataURL(file);
  });
}

export function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.addEventListener("load", () => {
      resolve(img);
    });

    img.addEventListener("error", (e) => {
      reject(e);
    });

    img.src = url;
  });
}

function colorComponent(c: number) {
  return `${c.toString(16).padStart(2, "0")}`;
}

export function colorFromImageData(imageData: ImageData, x: number, y: number) {
  // Depending on the wrapper offset sometimes we can get into the .5 pixel territory.
  x = Math.floor(x);
  y = Math.floor(y);

  const start = (imageData.width * y + x) * 4;
  const [r, g, b] = imageData.data.slice(start, start + 3);
  return `#${colorComponent(r)}${colorComponent(g)}${colorComponent(b)}`;
}
