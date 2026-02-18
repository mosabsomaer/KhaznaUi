export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const convertSvgToImage = (
  svgString: string, 
  width: number, 
  height: number, 
  format: 'image/png' | 'image/webp'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Set explicit dimensions
    canvas.width = width;
    canvas.height = height;

    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        // Draw image
        ctx.drawImage(img, 0, 0, width, height);
        // Convert to data URL
        const dataUrl = canvas.toDataURL(format);
        URL.revokeObjectURL(url);
        resolve(dataUrl);
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };

    img.src = url;
  });
};
