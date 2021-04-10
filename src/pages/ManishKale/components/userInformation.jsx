import {
  Paper,
  Grid,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStlyes = makeStyles((theme) => ({
  paper: {
    border: "1px solid rgba(0,0,0,0.3)",
    padding: "1em",
    textAlign: "center",
  },

  typography: {
    textAlign: "center",
  },
}));

const UserInformation = ({
  isEdit,
  locality,
  city,
  state,
  country,
  setLocality,
  setCity,
  setState,
  setCountry,
}) => {
  const classes = useStlyes();

  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.typography}>
            User Information
          </Typography>
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id="locality"
            variant="outlined"
            label="Locality"
            value={locality || ""}
            inputProps={{ readOnly: isEdit }}
            onChange={(event) => setLocality(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            id="city"
            fullWidth
            variant="outlined"
            label="City"
            value={city || ""}
            inputProps={{ readOnly: isEdit }}
            onChange={(event) => setCity(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id="state"
            variant="outlined"
            label="State"
            value={state || ""}
            inputProps={{ readOnly: isEdit }}
            onChange={(event) => setState(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            id="country"
            fullWidth
            variant="outlined"
            label="Country"
            value={country || ""}
            inputProps={{ readOnly: isEdit }}
            onChange={(event) => setCountry(event.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserInformation;
