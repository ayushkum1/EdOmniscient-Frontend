import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { handleAcademicRequest } from "./AcademicImageUploaderHelper";
import { useForm } from "react-hook-form";

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

export default function AcademicForm(props) {
  const {
    open,
    onClose,
    instId,
    row,
    token,
    isEdit,
    refresh,
    showSuccess,
    showError,
  } = props;
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();
  // const [open, setopen] = useState(true);
  // const [instituteId, setinstituteId] = useState(instId || "");
  const [eventName, seteventName] = useState(row?.name || "");
  const [eventDescription, seteventDescription] = useState(
    row?.description || ""
  );
  const [eventDate, seteventDate] = useState(row?.date || "");
  const [eventImage, seteventImage] = useState(row?.imageUrl || "");

  const handleClose = () => {
    // setinstituteId("");
    seteventDate("");
    seteventName("");
    seteventDescription("");
    seteventImage("");
    onClose();
  };

  useEffect(() => {
    seteventDate(row?.date || "");
    seteventName(row?.name || "");
    seteventDescription(row?.description || "");
    seteventImage(row?.imageUrl || "");
    return () => {
      seteventDate("");
      seteventName("");
      seteventDescription("");
      seteventImage("");
    };
  }, [props, row]);

  return (
    <div>
      <Container maxWidth="lg">
        <Dialog
          aria-labelledby="academic-form"
          open={open}
          onClose={handleClose}
        >
          <DialogTitle id="academic-form">{"Academic Form"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <TextField
                  required
                  label="Required"
                  className={classes.textField}
                  autoFocus
                  margin="dense"
                  id="event-name"
                  value={eventName}
                  onChange={(e) => {
                    seteventName(e.target.value);
                  }}
                  //add on change here
                  label="Event Name"
                  type="text"
                />
                {eventName.length > 35 && (
                  <div style={{ color: "red" }}>
                    Event name cant be empty or more than 35
                  </div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  paddingTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  required
                  className={classes.textField}
                  autoFocus
                  margin="dense"
                  id="eventdate"
                  value={eventDate}
                  onChange={(e) => seteventDate(e.target.value)}
                  type="date"
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                xl={12}
                style={{ paddingTop: "15px" }}
              >
                <input
                  required
                  accept="image/*"
                  id="file-chooser"
                  // ref={fileChooserRef}
                  type="file"
                  onChange={(e) => seteventImage(e.target.files[0])}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Grid container>
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <TextField
                      // className={classes.textField}
                      required
                      label="Required"
                      id="event-description-multi"
                      label="Event Description"
                      multiline
                      rows="10"
                      error={eventDescription?.length < 50}
                      defaultValue={eventDescription}
                      onChange={(e) => seteventDescription(e.target.value)}
                      className={classes.textField}
                      margin="normal"
                      variant="filled"
                    />
                    {eventDescription.length < 50 && (
                      <div style={{ color: "red" }}>
                        Event Description can not be less than 50 characters
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Grid container>
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={
                        eventName === "" ||
                        eventName.length > 35 ||
                        eventDate === "" ||
                        eventImage.length === 0 ||
                        eventDescription.length < 50
                      }
                      component="span"
                      className={classes.textField}
                      onClick={() => {
                        if (eventDescription?.length > 50 && eventImage) {
                          handleAcademicRequest(
                            token,
                            instId,
                            eventName,
                            eventDescription,
                            eventDate,
                            eventImage,
                            refresh,
                            showSuccess,
                            showError,
                            isEdit,
                            row?.id
                          );
                          handleClose();
                        }
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
