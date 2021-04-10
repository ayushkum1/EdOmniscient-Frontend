import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PublishIcon from "@material-ui/icons/Publish";
import DoneIcon from "@material-ui/icons/Done";
import {
  FormControl,
  InputLabel,
  LinearProgress,
  makeStyles,
  MenuItem,
  Select,
  useTheme,
} from "@material-ui/core";
import {
  cityList,
  regionList,
  stateList,
} from "../../../components/common/constants";
import {
  addDisplayPhoto,
  handleOnChange,
  updateInstituteInfo,
} from "./upload_helper/institute.profile.upload";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  upload: {
    display: "flex",
    gap: theme.spacing(2),
    justifyContent: "space-between",
    paddingTop: theme.spacing(3),
  },
  uploadBtn: {
    [theme.breakpoints.up("sm")]: {
      width: "12em",
    },
  },
}));

function EditInstituteDialog(props) {
  const { open, onClose, token, curInstitute, institute, refresh } = props;

  const classes = useStyles();
  const theme = useTheme();

  const emptyForm = {
    name: institute.name,
    nick: institute.nick,
    about: institute.about,
    aboutPlacements: institute.aboutPlacements,
    profilePicUrl: institute.profilePicUrl,
    coverPicUrl: institute.coverPicUrl,
    streetAddr: institute.location?.streetAddr,
    city: institute.location?.geography.city,
    state: institute.location?.geography.state,
    pinCode: institute.location?.geography.pinCode,
    region: institute.location?.geography.region,
  };
  const [form, setForm] = useState(emptyForm);
  const [profilePic, setProfilePic] = useState([]);
  const [coverPic, setCoverPic] = useState([]);

  const [profileUrl, setProfileUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  const [profilePicSize, setProfilePicSize] = useState({
    currentProgress: 0,
    totalFileSize: 0,
  });

  const [coverPicSize, setCoverPicSize] = useState({
    currentProgress: 0,
    totalFileSize: 0,
  });

  const [valid, setValid] = useState({
    name: "",
    nick: "",
    about: "",
    aboutPlacements: "",
    profilePicUrl: "",
    coverPicUrl: "",
    streetAddr: "",
    city: "",
    state: "",
    pinCode: "",
    region: "",
  });

  const profilePicFileRef = useRef();
  const coverPicFileRef = useRef();

  const handleClose = () => {
    setForm(emptyForm);
    setValid({
      name: "",
      nick: "",
      about: "",
      aboutPlacements: "",
      profilePicUrl: "",
      coverPicUrl: "",
      streetAddr: "",
      city: "",
      state: "",
      pinCode: "",
      region: "",
    });

    setProfilePicSize({
      currentProgress: 0,
      totalFileSize: 0,
    });

    setCoverPicSize({
      currentProgress: 0,
      totalFileSize: 0,
    });

    setProfilePic([]);
    setCoverPic([]);

    setProfileUrl("");
    setCoverUrl("");

    if (profilePicFileRef.current && coverPicFileRef.current) {
      profilePicFileRef.current.value = null;
      coverPicFileRef.current.value = null;
    }
    onClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const lettersOnlyRE = /^[a-zA-Z\s*]+$/;
    const pinCodeRE = /^[0-9]{6}$/;

    let valid = {
      name: form.name.length > 0 ? "" : "Must contain letters",
      nick: form.nick.length > 0 ? "" : "Must contain letters",
      about:
        form.about.length >= 50 && form.aboutPlacements.length <= 2000
          ? ""
          : "Content length should be 50 to 2000 characters",
      aboutPlacements:
        form.about.length >= 50 && form.aboutPlacements.length <= 2000
          ? ""
          : "Content length should be 50 to 2000 characters",
      streetAddr:
        form.streetAddr.length > 0 && form.streetAddr.length < 256
          ? ""
          : "Content length should not exceed 255 characters",
      city: lettersOnlyRE.test(form.city) ? "" : "Must contain letters",
      state: lettersOnlyRE.test(form.state) ? "" : "Must contain letters",
      pinCode: pinCodeRE.test(form.pinCode)
        ? ""
        : "Must contain a 6 dit number",
      region: lettersOnlyRE.test(form.region) ? "" : "Must contain letters",
    };

    setValid(valid);

    return Object.values(valid).every((x) => x === "");
  };

  useEffect(() => {
    const checkUploaded = () => {
      return profileUrl.length > 0 || coverUrl.length > 0;
    };
    if (checkUploaded())
      setForm({ ...form, profilePicUrl: profileUrl, coverPicUrl: coverUrl });

    return () => {
      setValid({
        name: "",
        nick: "",
        about: "",
        aboutPlacements: "",
        profilePicUrl: "",
        coverPicUrl: "",
        streetAddr: "",
        city: "",
        state: "",
        pinCode: "",
        region: "",
      });
    };
  }, [profileUrl, coverUrl]);

  const handleSubmit = () => {
    console.log(validate());

    if (validate()) {
      // api call to backend for put
      updateInstituteInfo(token, curInstitute, form)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err.response);
        })
        .finally(() => {
          refresh();
          handleClose();
        });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      aria-labelledby="edit-institute-dialog"
    >
      <AppBar variant="outlined" color="primary">
        <DialogTitle id="edit-institute-dialog">Edit Institute</DialogTitle>
      </AppBar>
      <DialogContent>
        <Container maxWidth="md" style={{ marginTop: "5em" }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={valid.name !== ""}
                helperText={valid.name}
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                value={form.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={valid.nick !== ""}
                helperText={valid.nick}
                id="nick"
                name="nick"
                label="Nick"
                variant="outlined"
                value={form.nick}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={valid.about !== ""}
                helperText={valid.about}
                id="about"
                name="about"
                label="About"
                variant="filled"
                multiline
                rows={5}
                rowsMax={8}
                value={form.about}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={valid.aboutPlacements !== ""}
                helperText={valid.aboutPlacements}
                id="aboutPlacements"
                name="aboutPlacements"
                label="About Placements"
                variant="filled"
                multiline
                rows={5}
                rowsMax={8}
                value={form.aboutPlacements}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={valid.streetAddr !== ""}
                helperText={valid.streetAddr}
                id="streetAddr"
                name="streetAddr"
                label="Street Address"
                variant="outlined"
                value={form.streetAddr}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                error={valid.city !== ""}
                name="city"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="institute-city-label">City</InputLabel>
                <Select
                  name="city"
                  id="institute-city"
                  labelId="institute-city-label"
                  label="City"
                  value={form.city}
                  onChange={handleChange}
                >
                  {cityList.map((c, i) => (
                    <MenuItem key={i} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                error={valid.state !== ""}
                name="state"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="institute-state-label">State</InputLabel>
                <Select
                  name="state"
                  id="institute-state"
                  labelId="institute-state-label"
                  label="State"
                  value={form.state}
                  onChange={handleChange}
                >
                  {stateList.map((s, i) => (
                    <MenuItem key={i} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                error={valid.pinCode !== ""}
                helperText={valid.pinCode}
                id="pinCode"
                name="pinCode"
                label="Pin Code"
                variant="outlined"
                value={form.pinCode}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                error={valid.region !== ""}
                name="region"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="institute-region-label">Region</InputLabel>
                <Select
                  name="region"
                  id="institute-region"
                  labelId="institute-region-label"
                  label="Region"
                  value={form.region}
                  onChange={handleChange}
                >
                  {regionList.map((r, i) => (
                    <MenuItem key={i} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Profile pic  upload goes here */}
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={profilePicSize.currentProgress}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} className={classes.upload}>
              <label htmlFor="contained-button-profile-pic">
                <Button
                  startIcon={<AddAPhotoIcon />}
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.uploadBtn}
                >
                  Profile Photo
                  <input
                    ref={profilePicFileRef}
                    accept="image/*"
                    id="contained-button-profile-pic"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleOnChange(e, setProfilePic, setProfilePicSize)
                    }
                  />
                </Button>
              </label>

              <Typography
                variant="body1"
                component="span"
                style={{ wordBreak: "break-all" }}
              >
                {profilePic.name}
                {profileUrl.length > 0 ? <DoneIcon /> : null}
              </Typography>

              <Button
                startIcon={<PublishIcon />}
                variant="text"
                disabled={profilePic.length <= 0}
                // color="secondary"
                // style={{ color: theme.palette.primary.dark }}
                onClick={() =>
                  addDisplayPhoto(
                    curInstitute,
                    setProfileUrl,
                    false, // we are uploading profile pic so isCover = false
                    profilePic,
                    setProfilePic,
                    profilePicSize,
                    setProfilePicSize,
                    profilePicFileRef,
                    refresh
                  )
                }
              >
                Upload
              </Button>
            </Grid>

            {/* Cover pic  upload goes here */}

            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={coverPicSize.currentProgress}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} className={classes.upload}>
              <label htmlFor="contained-button-cover-pic">
                <Button
                  startIcon={<AddAPhotoIcon />}
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.uploadBtn}
                >
                  Cover Photo
                  <input
                    ref={coverPicFileRef}
                    accept="image/*"
                    id="contained-button-cover-pic"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleOnChange(e, setCoverPic, setCoverPicSize)
                    }
                  />
                </Button>
              </label>

              <Typography
                variant="body1"
                component="span"
                style={{ wordBreak: "break-all" }}
              >
                {coverPic.name}
                {coverUrl.length > 0 ? <DoneIcon /> : null}
              </Typography>

              <Button
                startIcon={<PublishIcon />}
                variant="text"
                disabled={coverPic.length <= 0}
                // color="secondary"
                // style={{ color: theme.palette.primary.dark }}
                onClick={() =>
                  addDisplayPhoto(
                    curInstitute,
                    setCoverUrl,
                    true, // we are uploading cover pic so isCover = true
                    coverPic,
                    setCoverPic,
                    coverPicSize,
                    setCoverPicSize,
                    coverPicFileRef,
                    refresh
                  )
                }
              >
                Upload
              </Button>
            </Grid>
          </Grid>

          <DialogActions>
            <Button onClick={handleClose} color="default">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default EditInstituteDialog;
