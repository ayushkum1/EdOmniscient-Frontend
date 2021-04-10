import axios from "axios";

export const getImages = async (e, insituteId, category, setImageList) => {
  await axios
    .get(
      `http://localhost:8080/media/instituteid/${insituteId}/category/${category.toLowerCase()}`
    )
    .then((mediaData) => {
      setImageList(mediaData.data);
    })
    .catch((error) => console.log(error));
};
