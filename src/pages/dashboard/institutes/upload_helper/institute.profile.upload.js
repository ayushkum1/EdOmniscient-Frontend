import axios from "axios";
import getAuthHeader from "../../../../services/getAuthHeader";
import { storage } from "../../../ayush/firebase";

export const updateInstituteInfo = (token, instituteId, form) => {
  return axios.put(
    `/api/institutes/${instituteId}`,
    {
      name: form.name,
      nick: form.nick,
      about: form.about,
      aboutPlacements: form.aboutPlacements,
      profilePicUrl: form.profilePicUrl,
      coverPicUrl: form.coverPicUrl,
      location: {
        streetAddr: form.streetAddr,
        geography: {
          city: form.city,
          state: form.state,
          pinCode: form.pinCode,
          region: form.region,
        },
      },
    },
    {
      headers: getAuthHeader(token),
    }
  );
};

const getFileName = (instId, isCover, file) => {
  const n = file.name;

  const idx = n.lastIndexOf(".");
  let ext = idx !== -1 ? n.substring(idx) : ".jpg";

  let prefix = isCover ? "cover" : "profile";

  return `${prefix}_${instId}_${ext}`;
};

export const addDisplayPhoto = (
  instituteId,
  setUrl,
  isCover,
  mediaFile,
  setmediaFile,
  fileSizeInfo,
  setfileSizeInfo,
  fileChooserRef,
  refresh
) => {
  // const empArr = []; //for setting the medial file after successfull upload
  let progress = 0;
  let totalProgress = 0;
  console.log(instituteId);

  const filename = getFileName(instituteId, isCover, mediaFile);

  const uploadTask = storage
    .ref(`Institute_Media/${instituteId}/dp/${filename}`)
    .put(mediaFile);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      progress = Math.round(snapshot.bytesTransferred);
      totalProgress = (progress / fileSizeInfo.totalFileSize) * 100;
      setfileSizeInfo((prevState) => ({
        ...prevState,
        currentProgress: totalProgress,
      }));
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref(`Institute_Media/${instituteId}/dp/`)
        .child(filename)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  );
};

export const handleOnChange = (event, setmediaFile, setfileSizeInfo) => {
  let totalFileSize = 0;
  console.log(event.target.files);

  const file = event.target.files[0];
  totalFileSize = file.size;

  setfileSizeInfo((prevState) => ({
    ...prevState,
    currentProgress: 0,
    totalFileSize: totalFileSize,
  }));

  setmediaFile(file);
};
