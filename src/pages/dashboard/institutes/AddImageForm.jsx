import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { handleOnChange, handleRequest } from "./upload_helper/upload.service";
import { storage } from "../../ayush/firebase/index";

export const categoryList = [
  "LIBRARY",
  "HOSTEL",
  "CANTEEN",
  "CLASSROOM",
  "LABS",
  "EVENT",
];

function AddImageForm({ open, onClose, instituteId, refresh, setRefresh }) {
  const theme = useTheme();

  const [category, setCategory] = useState("");

  const fileInputRef = useRef();
  const [files, setFiles] = useState([]);

  const [fileSize, setFileSize] = useState({
    currentProgress: 0,
    totalFileSize: 0,
  });

  const handleSave = () => {
    handleRequest(
      category,
      files,
      setFiles,
      storage,
      instituteId,
      fileSize,
      setFileSize,
      fileInputRef,
      refresh,
      setRefresh
    );
    setCategory("");
  };

  const handleClose = () => {
    setCategory("");
    fileInputRef.current.value = null;
    setFiles([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl error={category === ""} required fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                id="category-select"
                labelId="category-select-label"
                label="Category"
                defaultValue=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
              <input
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => handleOnChange(e, setFiles, setFileSize)}
              />
            </label>
          </Grid>

          <Grid item xs={8}>
            {[...files].map((file, idx) => (
              <Typography key={idx} variant="body1">
                {file.name}
              </Typography>
            ))}
          </Grid>
        </Grid>

        {/* <TextField margin="dense" id="name" label="Name Of File" type="name" /> */}
        {/* <Typography variant="overline">Media Type</Typography> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Cancel
        </Button>
        <Button
          disabled={category === ""}
          onClick={() => {
            handleSave();
            onClose();
          }}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddImageForm;
