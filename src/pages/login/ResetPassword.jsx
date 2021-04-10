import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import queryString from "query-string";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";

function ResetPassword(props) {
  const history = useHistory();
  const [resetSuccess, setResetSuccess] = useState("none");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = queryString.parse(history.location.search);
    setLoading(true);
    axios
      .get(`/api/auth/reset_password`, {
        params: {
          token: params.token,
        },
      })
      .then((resp) => setResetSuccess(true))
      .catch((err) => setResetSuccess(false))
      .finally(() => setLoading(false));
  }, [history]);

  return (
    <Container
      maxWidth="sm"
      style={{
        padding: "10em",
      }}
    >
      {loading && (
        <CircularProgress
          style={{
            margin: "auto",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      )}

      {resetSuccess === true && (
        <Alert severity="success">
          <AlertTitle>Reset Success</AlertTitle>
          Password has been reset successfully. Please check your email.
        </Alert>
      )}

      {resetSuccess === false && (
        <Alert severity="error">
          <AlertTitle>Reset Error</AlertTitle>
          Reset link is expired
        </Alert>
      )}
    </Container>
  );
}

export default ResetPassword;
