import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Copyright from "../../components/utility/Copyright";
import { useSnackbar } from "notistack";
import { doLogin } from "../../services/auth.service";
import { useToken } from "../../services/useToken";
import { getUserDetails } from "../../services/users.service";
// import bgImg from "../../assets/background.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      /* `url(${bgImg})` */ "url(https://picsum.photos/1200/800/)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const snackbarProps = (variant) => ({
  variant: String(variant).toLowerCase(),
  horizontal: "left",
  vertical: "bottom",
  transitionDuration: 5000,
});

export default function SignInPage(props) {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  // const history = useHistory();

  const { setToken } = useToken();

  const { enqueueSnackbar } = useSnackbar();

  const [creds, setCreds] = useState({
    username: "",
    password: "",
    // rememberMe: false,
  });
  const [usernameError, setUsenameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleValidation = () => {
    setUsenameError(!re.test(creds.username));
    setPasswordError(creds.password.length <= 0);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    doLogin(creds.username, creds.password)
      .then((resp) => {
        getUserDetails(resp.data.jwt)
          .then((resp) => {
            console.log(resp.data);
            userContext.setUser(resp.data);
            // history.push("/");
            window.location.href = "/";
          })
          .catch((err) => {
            console.log(err.response);
            userContext.setUser(null);
            setToken(null);
            enqueueSnackbar(
              err.response.data.message,
              snackbarProps(err.response.data.messageType)
            );
          });
      })
      .catch((err) => {
        console.log(err.response, "login failed");
        setToken(null);
        enqueueSnackbar(
          err.response.data.message,
          snackbarProps(err.response.data.messageType)
        );
      });
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSignIn} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(event) =>
                setCreds({ ...creds, username: event.target.value })
              }
              error={usernameError}
              helperText={usernameError ? "Not an email" : ""}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) =>
                setCreds({ ...creds, password: event.target.value })
              }
              error={passwordError}
              helperText={passwordError ? "Password cannot be empty" : ""}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              onChange={(event) =>
                setCreds({ ...creds, rememberMe: !creds.rememberMe })
              }
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleValidation}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot_password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
