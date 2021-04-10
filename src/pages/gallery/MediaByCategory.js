import { getEmbedUrl } from "../../components/utility/GalleryUtils";

export default function MediaByCategory(data, embed = false) {
  let allImgs = data.filter((r) => {
    return r.mediaType === "IMAGE";
  });

  let allVideos = data.filter((r) => {
    return r.mediaType === "VIDEO";
  });
  // console.log(allImgs);
  let categoryImageMap = new Map();
  allImgs.forEach((i) => {
    if (categoryImageMap.has(i.category)) {
      categoryImageMap.get(i.category).push({ id: i.id, url: i.url });
      // console.log(categoryImageMap.get(i.category));
    } else {
      categoryImageMap.set(i.category, [{ id: i.id, url: i.url }]);
    }
  });

  let categoryVideoMap = new Map();
  allVideos.forEach((i) => {
    let vidUrl = embed ? getEmbedUrl(i.url) : i.url;

    if (categoryVideoMap.has(i.category)) {
      categoryVideoMap.get(i.category).push({ id: i.id, url: vidUrl });
    } else {
      categoryVideoMap.set(i.category, [{ id: i.id, url: vidUrl }]);
    }
  });
  return {
    categoryImageMap,
    categoryVideoMap,
  };
}
