import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const emailRE = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const validate = () => {
    const valid = emailRE.test(email) ? "" : "Invalid Email";
    setError(valid);
    console.log(valid);
    return valid === "";
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
      setDisabled(true);
      axios
        .post(`/api/auth/forgot_password`, {
          email: email,
        })
        .then((resp) => {
          setSuccess(resp.data.message);
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        paddingTop: "10em",
      }}
    >
      {success !== "" && (
        <Alert severity="info" style={{ marginBottom: "2em" }}>
          <AlertTitle>Request Sent</AlertTitle>
          {success}
        </Alert>
      )}
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} style={{ padding: "1em", textAlign: "center" }}>
          {loading && <CircularProgress />}
        </Grid>
        <Grid
          item
          xs={12}
          style={{ textAlign: "center", paddingBottom: "3em" }}
        >
          <Typography variant="h5" color="inherit">
            Reset your password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            error={error !== ""}
            helperText={error}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={disabled}
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
          >
            Reset Password
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => {
              setEmail("");
              setError("");
              setTimeout(() => {
                history.push("/signin");
              }, 500);
            }}
            fullWidth
            variant="text"
          >
            {success !== "" ? "Close" : "Cancel"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ForgotPassword;
