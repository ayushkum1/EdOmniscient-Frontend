import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { categoryList } from "./AddImageForm";
import { saveMedia } from "../../../services/gallery.service";

function AddVideoForm(props) {
  const { open, onClose, instituteId, refresh, setRefresh, token } = props;
  const [data, setData] = useState({});

  const handleClose = () => {
    setData({});
    onClose();
  };

  const handleSave = () => {
    console.log(data);
    saveMedia(token, instituteId, data)
      .then((resp) => {
        console.log(resp.data);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl error={!data.category} required fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                id="category-select"
                labelId="category-select-label"
                label="Category"
                defaultValue=""
                value={data?.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                {categoryList.map((c, idx) => (
                  <MenuItem key={idx} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Youtube Video URL"
              value={data?.url}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Cancel
        </Button>
        <Button
          disabled={!data.category}
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

export default AddVideoForm;
