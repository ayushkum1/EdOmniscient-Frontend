import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Avatar, useTheme } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";
import { changePassword } from "../../services/users.service";
import { useToken } from "../../services/useToken";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

const snackbarProps = (variant) => ({
  variant: String(variant).toLowerCase(),
  anchorOrigin: {
    horizontal: "left",
    vertical: "bottom",
  },
  transitionDuration: 5000,
});

function ChangePassword(props) {
  // const { user } = props;
  const theme = useTheme();
  const history = useHistory();

  const { token } = useToken();
  const { enqueueSnackbar } = useSnackbar();

  const [old, setOld] = useState("");
  const [pass, setPass] = useState({ newPass: "", confirmPass: "" });

  const [valid, setValid] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPass({ ...pass, [name]: value });
  };

  const validate = () => {
    const passwdRE = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    let temp = {
      password: passwdRE.test(pass.newPass)
        ? ""
        : "Password must contain at least 1 lowercase letter, uppercase letter, a number, a special character and length should be between 6 and 20",
      confirmPassword:
        pass.newPass === pass.confirmPass ? "" : "Passwords must match",
    };

    setValid(temp);

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("all ok");

      changePassword(token, old, pass.newPass)
        .then((resp) => {
          enqueueSnackbar(
            resp.data.message,
            snackbarProps(resp.data?.messageType)
          );
          setTimeout(() => {
            history.push("/");
          }, 1500);
        })
        .catch((err) => {
          enqueueSnackbar(
            err.response?.data?.message,
            snackbarProps(
              err.response?.data?.message
                ? err.response?.data?.messageType
                : "error"
            )
          );
        });
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: theme.spacing(6),
          }}
        >
          <Avatar
            style={{
              margin: theme.spacing(5, 0, 2, 0),
              backgroundColor: theme.palette.success.dark,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">Change Password</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            id="oldPass"
            name="oldPass"
            label="Old Password"
            variant="outlined"
            value={old}
            onChange={(e) => setOld(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            error={valid.password !== ""}
            helperText={valid.password}
            id="newPass"
            name="newPass"
            label="New Password"
            variant="outlined"
            value={pass.newPass}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            error={valid.confirmPassword !== ""}
            helperText={valid.confirmPassword}
            id="confirmPass"
            name="confirmPass"
            label="Confirm Password"
            variant="outlined"
            value={pass.confirmPass}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "flex-end", gap: "1em" }}
        >
          <Button onClick={() => history.goBack()} variant="text">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChangePassword;
