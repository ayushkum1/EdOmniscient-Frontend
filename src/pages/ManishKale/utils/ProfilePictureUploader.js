import axios from "axios";
import { storage } from "../../ayush/firebase/index";
import getAuthHeader from "./../../../services/getAuthHeader";

const ProfilePictureUploader = (
  uid, //this id will be provided by request
  image,
  setProfilePicLink,
  token
) => {
  //const file = image;
  //console.log("fileImage", file);
  //console.log("Image", image);
  console.log(image);
  console.log("name", image.name);
  const uploadTask = storage.ref(`Users/${uid}/${image.name}`).put(image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log("hello from snapshot");
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref(`Users/${uid}/`)
        .child(image.name)
        .getDownloadURL()
        .then(async (url) => {
          console.log(url);
          await axios
            .patch(
              `/api/users/${uid}`,
              {
                profilePicLink: url,
              },
              { headers: getAuthHeader(token) }
            )
            .then((mediaData) => {
              setProfilePicLink(url);

              console.log(mediaData.data);
            });
        })
        .catch((error) => console.log(error));
    }
  );
};

export default ProfilePictureUploader;
