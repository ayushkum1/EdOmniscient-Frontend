import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import { InputBase } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { handleOnChange, addNewCompany } from "./upload_helper/company.service";

function AddCompanyForm(props) {
  const { open, onClose, token, instituteId, refresh } = props;

  const emptyForm = {
    id: "",
    name: "",
    websiteUrl: "",
  };
  const [companyForm, setCompanyForm] = useState(emptyForm);

  const fileInputRef = useRef();
  const [file, setFile] = useState([]);

  const [fileSize, setFileSize] = useState({
    currentProgress: 0,
    totalFileSize: 0,
  });

  const handleClose = () => {
    fileInputRef.current.value = null;
    setCompanyForm(emptyForm);
    onClose();
  };

  const handleChange = (e) => {
    setCompanyForm({
      ...companyForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    addNewCompany(
      token,
      instituteId,
      companyForm,
      file,
      setFile,
      fileSize,
      setFileSize,
      fileInputRef,
      refresh
    );
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Company Details</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              value={companyForm.id}
              onChange={handleChange}
              name="id"
              id="CompanyId"
              label="Id"
              type="number"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              value={companyForm.name}
              onChange={handleChange}
              name="name"
              id="name"
              label="Company Name"
              type="name"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={companyForm.websiteUrl}
              onChange={handleChange}
              name="websiteUrl"
              id="websiteUrl"
              label="Website Url"
              type="url"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Select Logo
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleOnChange(e, setFile, setFileSize)}
                />
              </Button>
            </label>
          </Grid>

          <Grid item xs={9}>
            <Typography variant="body1">{file?.name}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCompanyForm;
