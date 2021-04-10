import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/utility/Copyright";
import { regionList, stateList } from "../../components/common/constants";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";
import { createUser } from "../../services/users.service";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  adminNote: {
    fontSize: "1rem",
    fontWeight: 400,
    color: theme.palette.error.dark,
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    pinCode: "",
    region: "",
    asAdmin: false,
  };

  const [signUpForm, setSignUpForm] = useState(emptyForm);

  const [validation, setValidation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    pinCode: "",
    region: "",
  });

  const [disabled, setDisabled] = useState(false);

  const handleFormChange = (event) => {
    setSignUpForm({ ...signUpForm, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const lettersOnlyRE = /^[a-zA-Z\s*]+$/;
    const emailRE = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const passwdRE = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    const pinCodeRE = /^[0-9]{6}$/;

    let errors = {
      firstName: lettersOnlyRE.test(signUpForm.firstName)
        ? ""
        : "Must contain letters",
      lastName: lettersOnlyRE.test(signUpForm.lastName)
        ? ""
        : "Must contain letters",
      email: emailRE.test(signUpForm.email) ? "" : "Invalid email address",
      password: passwdRE.test(signUpForm.password)
        ? ""
        : "Password must contain at least 1 lowercase letter, uppercase letter, a number, a special character and length should be between 6 and 20",
      confirmPassword:
        signUpForm.password === signUpForm.confirmPassword
          ? ""
          : "Passwords must match",
      city: lettersOnlyRE.test(signUpForm.city) ? "" : "Must contain letters",
      state: lettersOnlyRE.test(signUpForm.state) ? "" : "Must contain letters",
      pinCode: pinCodeRE.test(signUpForm.pinCode)
        ? ""
        : "Must contain a 6 dit number",
      region: lettersOnlyRE.test(signUpForm.region)
        ? ""
        : "Must contain letters",
    };

    setValidation(errors);

    return Object.values(errors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    const valid = validateForm();
    console.log(valid);
    if (valid) {
      console.log(signUpForm);
      createUser(signUpForm)
        .then((resp) => {
          showSuccessMessages(resp.data.message);
          setTimeout(() => {
            history.push("/signin");
          }, 5000);
          setSignUpForm(emptyForm);
        })
        .catch((err) => {
          console.log(err.response);
          enqueueSnackbar(err.response.data.message, {
            variant: "error",
            anchorOrigin: {
              horizontal: "center",
              vertical: "top",
            },
            transitionDuration: 5000,
          });
          setDisabled(false);
        });
    }
  };

  const showSuccessMessages = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
      anchorOrigin: {
        horizontal: "center",
        vertical: "top",
      },
      transitionDuration: 5000,
    });
    enqueueSnackbar("You are being redirected to Sign In page.", {
      variant: "default",
      anchorOrigin: {
        horizontal: "center",
        vertical: "top",
      },
      transitionDuration: 5000,
    });
  };

  return (
    <Container component="div" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleFormChange}
                error={validation.firstName !== ""}
                helperText={validation.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleFormChange}
                error={validation.lastName !== ""}
                helperText={validation.lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFormChange}
                error={validation.email !== ""}
                helperText={validation.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFormChange}
                error={validation.password !== ""}
                helperText={validation.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFormChange}
                error={validation.confirmPassword !== ""}
                helperText={validation.confirmPassword}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleFormChange}
                error={validation.city !== ""}
                helperText={validation.city}
                name="city"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                name="state"
                variant="outlined"
                fullWidth
                required
                error={validation.state !== ""}
              >
                <InputLabel id="user-state-label">State</InputLabel>
                <Select
                  onChange={handleFormChange}
                  // error={validation.state !== ""}
                  // helperText={validation.state}
                  name="state"
                  id="user-state"
                  labelId="user-state-label"
                  label="State"
                  fullWidth
                  defaultValue=""
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
                onChange={handleFormChange}
                error={validation.pinCode !== ""}
                helperText={validation.pinCode}
                name="pinCode"
                variant="outlined"
                required
                fullWidth
                id="pinCode"
                label="Pin Code"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                name="region"
                variant="outlined"
                fullWidth
                required
                error={validation.region !== ""}
              >
                <InputLabel id="user-region-label">Region</InputLabel>
                <Select
                  onChange={handleFormChange}
                  // error={validation.region !== ""}
                  // helperText={validation.region}
                  name="region"
                  id="user-region"
                  labelId="user-region-label"
                  label="Region"
                  fullWidth
                  defaultValue=""
                >
                  {regionList.map((s, i) => (
                    <MenuItem key={i} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="asAdmin"
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        [e.target.name]: e.target.checked,
                      })
                    }
                    color="secondary"
                  />
                }
                label="Sign up as institute admin"
              />
            </Grid>

            <Grid item xs={12}>
              <span hidden={!signUpForm.asAdmin} className={classes.adminNote}>
                You will have to contact us via email to get appointed as admin
                to an institute.
              </span>
            </Grid>
          </Grid>
          <Button
            disabled={disabled}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
