import axios from "axios";

export const handleRequest = (
  category,
  setcategory,
  seturl,
  mediaFile,
  setmediaFile,
  storage,
  instituteId,
  setisntituteId,
  fileSizeInfo,
  setfileSizeInfo,
  fileChooserRef
) => {
  let l = [];
  const empArr = []; //for setting the medial file after successfull upload
  let categoryValue = category;
  let progress = 0;
  let totalProgress = 0;
  mediaFile.forEach((item) => {
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
          .then(async (url) => {
            l.push(url);
            console.log(l);

            await axios
              .post("http://localhost:8080/media/create", {
                url: url,
                mediaType: "IMAGE", //always going to be photo
                category: categoryValue, //can be specific to fields like updload gallery, upload library, upload events etc
                name: item.name.substring(0, 20), //name will be the file name
                instituteId: instituteId, //should be the id of the requesting institute
              })
              .then((mediaData) => {
                console.log(mediaData.data);
                if (totalProgress === 100) {
                  setfileSizeInfo((prevState) => ({
                    ...prevState,
                    currentProgress: 0,
                    totalFileSize: 0,
                  }));
                  setmediaFile(empArr);
                  fileChooserRef.current.value = null;
                  setisntituteId("");
                  console.log(empArr);
                  console.log(mediaFile, "ayush");
                  setcategory("");
                }
              });
          });
      }
    );
  });
  console.log(fileSizeInfo);
  seturl(l);
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
