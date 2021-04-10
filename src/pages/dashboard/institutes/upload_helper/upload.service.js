import axios from "axios";
import getAuthHeader from "../../../../services/getAuthHeader";
import { storage } from "../../../ayush/firebase";

export const handleDeleteFirebase = (instituteId, categoryValue, name) => {
  const deleteTask = storage.ref(
    `Institute_Media/${instituteId}/${categoryValue}/${name}`
  );

  deleteTask
    .delete()
    .then(() => console.log(`image ${name} deleted!!`))
    .catch((err) => {
      console.log(`ERROR: could not delete image ${name}`);
    });
};

export const handleRequest = (
  category,
  mediaFile,
  setmediaFile,
  storage,
  instituteId,
  fileSizeInfo,
  setfileSizeInfo,
  fileChooserRef,
  refresh,
  handleClose,
  token
) => {
  let l = [];
  const empArr = []; //for setting the medial file after successfull upload
  let categoryValue = category;
  let progress = 0;
  let totalProgress = 0;
  let count = 0;
  mediaFile.forEach((item, idx) => {
    //Institute_Media is bucket name in firebase
    //using category value as a subfolder of Institute_Media
    //if error occurs, create a subfold with event traget value name
    const uploadTask = storage
      .ref(`Institute_Media/${instituteId}/${categoryValue}/${item.name}`)
      .put(item);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progress = Math.round(snapshot.bytesTransferred + progress);
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
          .ref(`Institute_Media/${instituteId}/${categoryValue}`)
          .child(item.name)
          .getDownloadURL()
          .then((url) => {
            l.push(url);
            console.log(l);

            axios
              .post(
                `/api/institutes/${instituteId}/media/image`,
                {
                  urls: [url],
                  mediaType: "IMAGE", //always going to be photo
                  category: categoryValue, //can be specific to fields like updload gallery, upload library, upload events etc
                  name: item.name.substring(0, 20), //name will be the file name
                  instituteId: instituteId, //should be the id of the requesting institute
                },
                {
                  headers: getAuthHeader(token),
                }
              )
              .then((mediaData) => {
                console.log(mediaData.data);
                if (totalProgress === 100) {
                  setfileSizeInfo((prevState) => ({
                    ...prevState,
                    currentProgress: 0,
                    totalFileSize: 0,
                  }));
                  setmediaFile(empArr);
                  // if (fileChooserRef.current !== null)
                  //   fileChooserRef.current.files = null;
                }
              })
              .catch((err) => {
                console.error(err);
              })
              .finally(() => {
                count = count + 1;
                if (count === mediaFile.length) {
                  refresh();
                  handleClose();
                }
              });
          });
      }
    );
  });
  console.log(fileSizeInfo);
  //   seturl(l);
};

export const handleOnChange = (event, setmediaFile, setfileSizeInfo) => {
  let totalFileSize = 0;
  let l = [];
  // setmedia(event.target.files[0]);
  console.log(event.target.files);
  l = [...event.target.files];
  l.forEach((item) => {
    totalFileSize = item.size + totalFileSize;
  });
  setfileSizeInfo((prevState) => ({
    ...prevState,
    currentProgress: 0,
    totalFileSize: totalFileSize,
  }));
  setmediaFile(l);
  console.log(l);
};
