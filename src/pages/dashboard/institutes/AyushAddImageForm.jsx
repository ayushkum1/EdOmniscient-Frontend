import React, { useState, useRef } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import LinearProgress from "@material-ui/core/LinearProgress";
import { handleOnChange, handleRequest } from "./upload_helper/upload.service";
import { storage } from "../../ayush/firebase/index";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

export const categoryList = [
  "LIBRARY",
  "HOSTEL",
  "CANTEEN",
  "CLASSROOM",
  "LABS",
  "EVENT",
];

function AyushAddImageForm(props) {
  const { open, onClose, instituteId, refresh, token } = props;

  const [fileSizeInfo, setfileSizeInfo] = useState({
    currentProgress: 0,
    totalFileSize: 0,
  });

  const classes = useStyles();
  const [mediaFile, setmediaFile] = useState([]);
  const [category, setcategory] = useState(""); //to store category
  const theme = useTheme();

  const fileChooserRef = useRef();

  const handleClose = () => {
    setcategory("");
    if (fileChooserRef.current !== null) fileChooserRef.current.value = null;
    setmediaFile([]);
    onClose();
  };

  const handleSave = () => {
    handleRequest(
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
    );
    setcategory("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Image Upload Form"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LinearProgress
              variant="determinate"
              value={fileSizeInfo.currentProgress}
              color="primary"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              //   style={{ width: "80%" }}
              fullWidth
            >
              <InputLabel id="events-input-label">Choose Category</InputLabel>
              <Select
                label="Choose Category"
                id="select-category"
                value={category}
                onChange={(e) => {
                  setcategory(e.target.value);
                }}
              >
                {categoryList.map((c, idx) => (
                  <MenuItem key={idx} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <label htmlFor="file-chooser">
              <Button variant="contained" color="primary" component="span">
                Choose
              </Button>
              <input
                accept="image/*"
                id="file-chooser"
                ref={fileChooserRef}
                multiple
                type="file"
                onChange={(e) =>
                  handleOnChange(e, setmediaFile, setfileSizeInfo)
                }
                style={{ display: "none" }}
              />
            </label>
          </Grid>
          <Grid item xs={8}>
            {[...mediaFile].map((file, idx) => (
              <Typography
                key={idx}
                variant="body1"
                style={{ display: "list-item", wordBreak: "break-all" }}
              >
                {/* <strong>{`${idx + 1} `}</strong> */}
                {file.name}
              </Typography>
            ))}
          </Grid>
          {/* {console.log(fileSizeInfo)} */}
        </Grid>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={(e) => {
              handleSave();
              //   handleClose();
            }}
          >
            Upload
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default AyushAddImageForm;
