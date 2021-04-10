import axios from "axios";
import { storage } from "../../firebase/index";
import { useToken } from "../../../../services/useToken";
import getAuthHeader from "../../../../services/getAuthHeader";

const snackbarProps = (variant) => ({
  variant: String(variant).toLowerCase(),
  anchorOrigin: {
    horizontal: "left",
    vertical: "bottom",
  },
  transitionDuration: 5000,
});

export const handleCourseRequest = (
  courseId,
  courseName, //this id will be provided by request
  courseDuration,
  courseDescription,
  courseImage,
  courseFees,
  isUpdate,
  refresh,
  setRefresh,
  token,
  enqueueSnackbar
) => {
  const uploadTask = storage.ref(`Courses/${courseName}`).put(courseImage);
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
        .ref(`Courses`)
        .child(courseName)
        .getDownloadURL()
        .then(async (url) => {
          console.log(url);
          const apiUrl = "/api/courses";

          if (!isUpdate) {
            await axios
              .post(
                apiUrl,
                {
                  id: courseId,
                  name: courseName,
                  description: courseDescription,
                  photoUrl: url,
                  fees: courseFees,
                  duration: courseDuration,
                },
                {
                  headers: getAuthHeader(token),
                }
              )
              .then((mediaData) => {
                console.log(mediaData.data);
                setRefresh(!refresh);
                enqueueSnackbar(
                  "Created Successfully",
                  snackbarProps("success")
                );
              })
              .catch((err) => {
                enqueueSnackbar("Couldnt Create", snackbarProps("error"));
              });
          } else {
            // If user is updating the course
            axios
              .put(
                `${apiUrl}/${courseId}`,
                {
                  id: courseId,
                  name: courseName,
                  description: courseDescription,
                  photoUrl: url,
                  fees: courseFees,
                  duration: courseDuration,
                },
                {
                  headers: getAuthHeader(token),
                }
              )
              .then((resp) => {
                console.log(resp.data);
                setRefresh(!refresh);
                enqueueSnackbar(
                  "Updated Successfully",
                  snackbarProps("success")
                );
              })
              .catch((err) => {
                console.log(err.response.data);
                enqueueSnackbar("Couldnt Update", snackbarProps("error"));
              });
          }
        })
        .catch((error) =>
          enqueueSnackbar("Couldnt upload image", snackbarProps("error"))
        );
    }
  );
};
