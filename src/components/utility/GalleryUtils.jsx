export function extractVideoId(url) {
  url = String(url);
  let watchIdx = url.indexOf("v=");
  let embedIdx = url.indexOf("embed/");

  if (watchIdx > 0) return url.substring(watchIdx + 2);
  if (embedIdx > 0) return url.substring(embedIdx + 6);
}

export function getVideoThumbnail(url) {
  return `https://img.youtube.com/vi/${extractVideoId(url)}/0.jpg`;
}

export function getEmbedUrl(url) {
  return `https://www.youtube.com/embed/${extractVideoId(url)}`;
}
