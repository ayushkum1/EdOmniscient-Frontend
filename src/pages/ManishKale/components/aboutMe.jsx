import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
// import twitter from "../assets/twitter.svg";
// import instagram from "../assets/instagram.svg";

const useStlyes = makeStyles((theme) => ({
  paper: {
    border: "1px solid rgba(0,0,0,0.3)",

    padding: "1em",
    textAlign: "center",
  },
}));

const AboutMe = ({
  isEdit,
  about,
  setAbout,
  fbProfile,
  linkedinProfile,
  setFbProfile,
  setLinkedinProfile,
}) => {
  const classes = useStlyes();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} sm={12} m={6}>
          <Typography variant="h4">About Me</Typography>
        </Grid>
        <Grid item>
          <Divider variant="middle" />
        </Grid>
        <Grid item>
          <Grid item xl={12}>
            {isEdit ? (
              <Paper
                elevation={0}
                style={{ /*backgroundColor: grey[200],*/ minHeight: "5em" }}
              >
                <Typography variant="body1">{about}</Typography>
              </Paper>
            ) : (
              <TextField
                multiline
                fullWidth
                variant="standard"
                defaultValue={about}
                inputProps={{ readOnly: isEdit }}
                onChange={(event) => setAbout(event.target.value)}
              />
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">Connect Me on</Typography>
            </Grid>
            <Grid item className={classes.item}>
              <Grid container justify="center" spacing={2}>
                <Grid
                  item
                  component={"a"}
                  href={fbProfile}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.icon}
                >
                  <img alt="facebook logo" src={facebook} />
                </Grid>
                {/* <Grid
                  item
                  component={"a"}
                  href="https://twitter.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.icon}
                >
                  <img alt="twitter logo" src={twitter} />
                </Grid> */}
                <Grid
                  item
                  component={"a"}
                  href={linkedinProfile}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.icon}
                >
                  <img alt="twitter logo" src={linkedin} />
                </Grid>
                {/* <Grid
                  item
                  component={"a"}
                  href="https://www.instagram.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.icon}
                >
                  <img alt="instagram logo" src={instagram} s />
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          {!isEdit && (
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  label="Facebook Profile"
                  fullWidth
                  variant="outlined"
                  defaultValue={fbProfile}
                  inputProps={{ readOnly: isEdit }}
                  onChange={(event) => setFbProfile(event.target.value)}
                >
                  {fbProfile}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Linkedin Profile"
                  variant="outlined"
                  defaultValue={linkedinProfile}
                  inputProps={{ readOnly: isEdit }}
                  onChange={(event) => setLinkedinProfile(event.target.value)}
                >
                  {linkedinProfile}
                </TextField>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AboutMe;
