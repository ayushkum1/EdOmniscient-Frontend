import axios from "axios";
import getAuthHeader from "../../../../services/getAuthHeader";
import { storage } from "../../firebase/index";

export const handleAcademicRequest = (
  token,
  instituteId, //this instituteId will be provided by request
  eventname,
  description,
  date,
  image,
  refresh,
  showSuccess,
  showError,
  isEdit,
  eventId
) => {
  const uploadTask = storage
    .ref(`AcademicEvent/${instituteId}/${date}/${eventname}`)
    .put(image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log("hello from snapshot");
    },
    //       (snapshot) => {
    //     progress = Math.round(snapshot.bytesTransferred + progress);
    //     totalProgress = (progress / fileSizeInfo.totalFileSize) * 100;
    //     setfileSizeInfo((prevState) => ({
    //       ...prevState,
    //       currentProgress: totalProgress,
    //     }));
    //   }
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref(`AcademicEvent/${instituteId}/${date}`)
        .child(eventname)
        .getDownloadURL()
        .then(async (url) => {
          console.log(url);

          if (!isEdit) {
            await axios
              .post(
                `/api/institutes/${instituteId}/calendar`,
                {
                  date: date,
                  name: eventname,
                  imageUrl: url,
                  description: description,
                  institute: instituteId,
                },
                {
                  headers: getAuthHeader(token),
                }
                // "could not execute statement; SQL [n/a]; constraint [academic_calendar.PRIMARY]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement"
              )
              .then((mediaData) => {
                console.log(mediaData.data);
                refresh();
                showSuccess();
              })
              .catch((err) => {
                console.log(err.response);
                showError();
              });
          } else {
            await axios
              .put(
                `/api/institutes/${instituteId}/update/${eventId}`,
                {
                  date: date,
                  name: eventname,
                  imageUrl: url,
                  description: description,
                  institute: instituteId,
                },
                {
                  headers: getAuthHeader(token),
                }
              )
              .then((resp) => {
                console.log(resp.data);
                refresh();
                showSuccess();
              })
              .catch((err) => {
                console.log(err.response);
                showError();
              });
          }
        })
        .catch((error) => {
          console.log(error);
          showError();
        });
    }
  );
};
