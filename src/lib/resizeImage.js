// Downscales and compresses a photo in the browser before it's uploaded,
// so a 20MB camera JPEG doesn't blow past the API's request-size limit
// (and so the live site doesn't end up serving full-resolution originals).
export async function resizeImageFile(file, { maxDimension = 2200, quality = 0.82, maxBytes = 3_000_000 } = {}) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);

  let currentQuality = quality;
  let dataUrl = canvas.toDataURL("image/jpeg", currentQuality);
  while (dataUrl.length * 0.75 > maxBytes && currentQuality > 0.4) {
    currentQuality -= 0.1;
    dataUrl = canvas.toDataURL("image/jpeg", currentQuality);
  }
  return dataUrl;
}
