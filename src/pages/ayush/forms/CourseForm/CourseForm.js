import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { handleCourseRequest } from "./CourseImageUploader";
import { useToken } from "../../../../services/useToken";
import { useSnackbar } from "notistack";
// import FormControl from "@material-ui/core/FormControl";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import { handleAcademicRequest } from "./AcademicImageUploaderHelper";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
    width: "fit-content",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttonStyle: {
    minWidth: 180,
    height: 55,
    margin: theme.spacing(1),
    background: "skyblue",
  },
  textField: {
    marginLeft: "2px",
    marginRight: "2px",
    width: "100%",
  },
}));

export default function CourseForm(props) {
  const { token } = useToken();
  const { open, onClose, row, isUpdate, refresh, setRefresh } = props;
  const classes = useStyles();
  // const [open, setopen] = useState(true);
  const [courseName, setcourseName] = useState(row.name);
  const [courseDescription, setcourseDescription] = useState(row.description);
  const [courseFees, setcourseFees] = useState(row.fees);
  const [courseImage, setcourseImage] = useState("");
  const [courseDuration, setcourseDuration] = useState(row.duration);
  const [courseId, setcourseId] = useState(row.id);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <div>
      <Container maxWidth="lg">
        <Dialog aria-labelledby="course-form" open={open} onClose={onClose}>
          <DialogTitle id="course-form">{"Course Form"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                {/* this will be removed as we will get institute id from the request */}
                <TextField
                  required
                  label="Required"
                  style={{ width: "100%" }}
                  autoFocus
                  margin="dense"
                  id="course-id"
                  value={courseId}
                  onChange={(e) => {
                    setcourseId(e.target.value);
                  }}
                  //add on change here
                  label="Course Id"
                  type="number"
                />
                {courseId < 1 && (
                  <div style={{ color: "red" }}>
                    Course Id cannot be less than 1
                  </div>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Required"
                  style={{ width: "100%" }}
                  margin="dense"
                  id="course-name"
                  value={courseName}
                  onChange={(e) => {
                    setcourseName(e.target.value);
                  }}
                  //add on change here
                  label="Course Name"
                  type="text"
                />
                {courseName.length > 15 && (
                  <div style={{ color: "red" }}>
                    Event name cant be more than 15 characters
                  </div>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {/* this will be removed as we will get institute id from the request */}
                <TextField
                  style={{ width: "100%" }}
                  margin="dense"
                  id="course-duration"
                  value={courseDuration}
                  onChange={(e) => {
                    setcourseDuration(e.target.value);
                  }}
                  //add on change here
                  label="Course Duration"
                  type="number"
                />
                {(courseDuration > 36 || courseDuration < 1) && (
                  <div style={{ color: "red" }}>
                    Course duration cant be greater than 36 and less than 0
                  </div>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Required"
                  style={{ width: "100%" }}
                  margin="dense"
                  id="course-fees"
                  value={courseFees}
                  label="Course Fees"
                  onChange={(e) => setcourseFees(e.target.value)}
                  type="number"
                />
                {(courseFees < 1000 || courseFees > 1000000) && (
                  <div style={{ color: "red" }}>
                    Course Fees cant be less than 1000 or more than 1000000
                  </div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  paddingTop: "15px",
                }}
              >
                <input
                  required
                  label="Required"
                  accept="image/*"
                  id="file-chooser"
                  // ref={fileChooserRef}
                  type="file"
                  onChange={(e) => setcourseImage(e.target.files[0])}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Required"
                  style={{ width: "100%" }}
                  id="course-description-multi"
                  label="Course Description"
                  multiline
                  rows="10"
                  defaultValue={courseDescription}
                  onChange={(e) => setcourseDescription(e.target.value)}
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                />
                {(courseDescription.length < 50 ||
                  courseDescription.length > 2000) && (
                  <div style={{ color: "red" }}>
                    Course Description cant be less than 50 or more than 2000
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{ width: "100%" }}
                  disabled={
                    courseId < 1 ||
                    courseDescription.length < 50 ||
                    courseDescription.length > 2000 ||
                    courseFees < 1000 ||
                    courseFees > 1000000 ||
                    courseDuration > 36 ||
                    courseDuration < 1 ||
                    courseName.length > 15 ||
                    courseImage.length === 0
                  }
                  onClick={() => {
                    handleCourseRequest(
                      courseId,
                      courseName,
                      courseDuration,
                      courseDescription,
                      courseImage,
                      courseFees,
                      isUpdate,
                      refresh,
                      setRefresh,
                      token,
                      enqueueSnackbar
                    );
                    onClose();
                  }}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
