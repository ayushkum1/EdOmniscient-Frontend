import AppLayout from "./AppLayout";
import "./App.css";
// import bgImg from "./assets/background.jpeg";
import {
  CircularProgress,
  createMuiTheme,
  CssBaseline,
  // makeStyles,
  MuiThemeProvider,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import SignInPage from "./pages/login/SignInPage";
import SignUpPage from "./pages/login/SignUpPage";
import RootDashboard from "./pages/dashboard/root/RootDashboard";
import PrivateRoute from "./PrivateRoute";
import { useToken } from "./services/useToken";
import { SnackbarProvider } from "notistack";
import { getUserDetails } from "./services/users.service";
import ForbiddenPage from "./pages/error/ForbiddenPage";
import InstituteDashboard from "./pages/dashboard/institutes/InstituteDashboard";
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";

const theme = createMuiTheme({
  // palette: {
  //   background: {
  //     // default: "#f8f1f1",
  //     paper: "#fafafa",

  //     default: "#dadada",
  //     // paper: "#eeeeee",
  //   },

  // },

  // palette: {
  //   type: 'light',
  //   primary: {
  //     main: '#009688',
  //     light: '#a0c1bd',
  //     dark: '#004e45',
  //   },
  //   secondary: {
  //     main: '#607d8b',
  //     light: '#c1e2f5',
  //     dark: '#2c414c',
  //   },
  //   divider: '#BDBDBD',
  //   background: {
  //     paper: '#eeeeee',
  //   },
  // },

  palette: {
    type: "light",
    primary: {
      main: "#009688",
      light: "#a0c1bd",
      dark: "#004e45",
    },
    secondary: {
      main: "#FFC107",
      light: "#ffeeb8",
      dark: "#a67f00",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    divider: "#BDBDBD",
    background: {
      default: "#eeeeee",
      paper: "#fafafa",
    },
  },
});

// const useStyles = makeStyles(() => ({
//   bg: {
//     backgroundImage: `url(${bgImg})`,
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "contain",
//   },
// }));

const loginPages = [
  "/signin",
  "/signup",
  "/forgot_password",
  "/reset_password",
  // "/messages",
  // "/gridtest",
  "/dashboard/root",
  "/dashboard/institute",
  "/forbidden",
];

function App(props) {
  // const classes = useStyles();
  const { pathname } = useLocation();
  const { token, setToken } = useToken();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(token);
    if (token !== null) {
      const role = getUserRole(token);
      console.log("Here sets the role", role);
      getUserDetails(token)
        .then((resp) => {
          console.log(resp);
          setUser({ ...resp.data, role: role });
        })
        .then(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          // console.log(err.response);
          setUser(null);
        })
        .then((resp) => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });

      console.log(getUserRole(token));
    }
  }, [token]);

  function getUserRole(token) {
    if (token && token !== "invalid token") {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload).roles[0].authority;
    }
  }

  const hasRole = (role) => {
    return user && user?.role?.toLowerCase().includes(role);
  };

  if (loading) {
    return (
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    );
  } else {
    return (
      <MuiThemeProvider theme={theme}>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <CssBaseline />
          <SnackbarProvider>
            {!pathname.match(loginPages.join("|")) ? (
              <AppLayout
                setToken={setToken}
                // hasRole={hasRole}
                theme={theme}
              />
            ) : (
              <>
                <Switch>
                  <PrivateRoute
                    path="/dashboard/root"
                    isAuth={Boolean(user)}
                    roleAllowed={hasRole("root")}
                    // render={(props) => <RootDashboard theme={theme} {...props} />}
                    component={RootDashboard}
                  />
                  <PrivateRoute
                    path="/dashboard/institute"
                    isAuth={Boolean(user)}
                    roleAllowed={hasRole("institute_admin")}
                    // render={(props) => <RootDashboard theme={theme} {...props} />}
                    component={InstituteDashboard}
                  />
                  {/* <Route
                  path="/gridtest"
                  render={(props) => <TestGrid theme={theme} {...props} />}
                />
                <Route
                  path="/messages"
                  render={(props) => <MessengerPage theme={theme} {...props} />}
                /> */}
                  <Route
                    exact
                    path="/forgot_password"
                    render={(props) => (
                      <ForgotPassword theme={theme} {...props} />
                    )}
                  />
                  <Route
                    exact
                    path="/reset_password"
                    render={(props) => (
                      <ResetPassword theme={theme} {...props} />
                    )}
                  />
                  <Route
                    exact
                    path="/signin"
                    render={(props) => <SignInPage theme={theme} {...props} />}
                  />
                  <Route
                    exact
                    path="/signup"
                    render={(props) => <SignUpPage theme={theme} {...props} />}
                  />
                  <Route exact path="/forbidden" component={ForbiddenPage} />
                </Switch>
              </>
            )}
          </SnackbarProvider>
        </UserContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
