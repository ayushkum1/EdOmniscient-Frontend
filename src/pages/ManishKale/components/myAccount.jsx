import {
  Paper,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

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

const MyAccount = ({
  isEdit,
  email,
  fName,
  lName,
  setEmail,
  setFName,
  setLName,
}) => {
  const classes = useStlyes();

  const [username, setUserName] = useState(fName + " " + lName);

  useEffect(() => {
    setUserName(fName + " " + lName);
  }, [isEdit, email, fName, lName, setEmail, setFName, setLName]);

  // const [isDisabled, setIsdisabled] = useState(true);
  return (
    <Paper className={classes.paper} elevation={0}>
      <Form>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.typography}>
              My Account
            </Typography>
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              id="username"
              variant="outlined"
              label="Username"
              value={username}
              inputProps={{ readOnly: isEdit }}
              onChange={(event) => setUserName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              id="email"
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              value={email}
              inputProps={{ readOnly: true }}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              id="firstName"
              fullWidth
              variant="outlined"
              label="First Name"
              value={fName}
              inputProps={{ readOnly: isEdit }}
              onChange={(event) => setFName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              id="lastName"
              variant="outlined"
              label="Last Name"
              value={lName}
              inputProps={{ readOnly: isEdit }}
              onChange={(event) => setLName(event.target.value)}
            />
          </Grid>
        </Grid>
      </Form>
    </Paper>
  );
};

export default MyAccount;
