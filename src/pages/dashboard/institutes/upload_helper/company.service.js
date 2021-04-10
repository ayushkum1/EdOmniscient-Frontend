import axios from "axios";
import getAuthHeader from "../../../../services/getAuthHeader";
import { storage } from "../../../ayush/firebase";

export const getAllCompanies = () => {
  return axios.get("/api/companies");
};

export const getCompaniesByInstitute = (token, instituteId) => {
  return axios.get(`/api/institutes/${instituteId}/companies`, {
    headers: getAuthHeader(token),
  });
};

export const patchCompanies = (token, instituteId, payload) => {
  return axios.patch(`/api/institutes/${instituteId}/companies`, payload, {
    headers: getAuthHeader(token),
  });
};

export const handleDeleteCompany = (companyId) => {
  const deleteTask = storage.ref(`Company_Media/${companyId}.jpg`);

  deleteTask
    .delete()
    .then(() => console.log(`image deleted!!`))
    .catch((err) => {
      console.log(`ERROR: could not delete image`);
    });
};

const getFileName = (companyId, file) => {
  const n = file.name;

  const idx = n.lastIndexOf(".");
  let ext = idx !== -1 ? n.substring(idx) : ".jpg";

  return `${companyId}${ext}`;
};

export const addNewCompany = (
  token,
  instituteId,
  companyForm,
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

  const filename = getFileName(companyForm.id, mediaFile);

  const uploadTask = storage.ref(`Company_Media/${filename}`).put(mediaFile);

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
        .ref(`Company_Media/`)
        .child(filename)
        .getDownloadURL()
        .then((url) => {
          axios
            .post(
              `/api/companies`,
              {
                ...companyForm,
                logoUrl: url,
              },
              {
                headers: getAuthHeader(token),
              }
            )
            .then((resp) => {
              console.log(resp.data);

              axios
                .patch(
                  `/api/institutes/${instituteId}/companies`,
                  {
                    op: "add",
                    companies: [resp.data.companyId],
                  },
                  {
                    headers: getAuthHeader(token),
                  }
                )
                .then((r) => {
                  console.log(r);
                  refresh();
                })
                .catch((e) => {
                  console.log(e.response);
                });

              if (totalProgress === 100) {
                setfileSizeInfo((prevState) => ({
                  ...prevState,
                  currentProgress: 0,
                  totalFileSize: 0,
                }));
                setmediaFile(null);
                if (fileChooserRef.current !== null)
                  fileChooserRef.current.files = null;

                // refresh();
              }
            })
            .catch((err) => {
              console.log(err.response);
            });
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
