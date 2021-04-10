import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  makeStyles,
  Button,
  Menu,
  IconButton,
  Divider,
  MenuItem,
  Backdrop,
  Card,
  CardHeader,
  Hidden,
  Grid,
  Box,
  useTheme,
} from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import HomePageSearch from "./components/HomePageSearch";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import SearchBar from "./components/utility/SearchBar";
import UserContext from "./context/UserContext";
import Copyright from "./components/utility/Copyright";
import GalleryPage from "./pages/gallery/Gallery";
import CoursesPage from "./pages/CoursesPage";
import InstitutesPage from "./pages/InstitutesPage";
import InstituteProfile from "./pages/profile/college/InstituteProfile";
import { doLogout } from "./services/auth.service";
import ChangePassword from "./pages/login/ChangePassword";
import brainsinjarsLogo from "./assets/brainsinjars_logo_contrast.png";
import edOmniscientLogo from "./assets/EdOmniscient_logo_contrast.png";
import MainProfileWrapper from "./pages/ManishKale/components/MainProfileWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    // backgroundImage: `url(${appBarBG})`,
    // background: theme.palette.background.paper,
    padding: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
  toolBar: {
    minHeight: "10em",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
    },
  },

  title: {
    display: "block",
  },

  toolbarLinkBtns: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-evenly",
  },
  toolBarAction: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.appBar + 1,
    color: "#fff",
    alignItems: "start",
  },
  backdropSearch: {
    margin: "auto",
    maxWidth: "80%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "55%",
    },
  },

  content: {
    // flexGrow: 1,
    minHeight: "65vh",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      // marginTop: theme.spacing(10),
    },
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "5em",
    color: theme.palette.primary.contrastText,

    backgroundColor: theme.palette.primary.dark,
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[200]
    //     : theme.palette.grey[800],
  },
  footerContactRow: {
    display: "flex",
    flexFlow: "row",
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 2,
  });
}

export default function AppLayout(props) {
  // const theme = props.theme;
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  const userContext = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [searchBackdropOpen, setSearchBackdropOpen] = useState(false);

  const handleProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    history.push("/myprofile");
    handleMenuClose();
  };

  const handleChangePassword = () => {
    history.push("/change_password");
    handleMenuClose();
  };

  const handleLogout = () => {
    // userContext.setUser(null);
    doLogout()
      .then((resp) => {
        userContext.setUser(null);
        props.setToken(null);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
    handleMenuClose();
  };

  const handleSearchToggle = () => {
    setSearchBackdropOpen(!searchBackdropOpen);
  };
  const handleSearchClose = () => {
    setSearchBackdropOpen(false);
  };

  const hasRole = (role) => {
    return (
      userContext.user && userContext.user.role?.toLowerCase().includes(role)
    );
  };

  const userMenu = [
    <MenuItem key="profile" onClick={handleProfileClick}>
      Profile
    </MenuItem>,
    <MenuItem key="account" onClick={handleChangePassword}>
      Change Password
    </MenuItem>,
    <MenuItem key="logout" onClick={handleLogout}>
      Logout
    </MenuItem>,
  ];

  const rootMenu = [
    <MenuItem
      key="root_dash"
      onClick={() => {
        history.push("/dashboard/root");
        handleMenuClose();
      }}
    >
      Dashboard
    </MenuItem>,
  ];

  const instituteAdminMenu = [
    <MenuItem
      key="inst_dash"
      onClick={() => {
        history.push("/dashboard/institute");
        handleMenuClose();
      }}
    >
      Dashboard
    </MenuItem>,
  ];

  const anonymousMenu = [
    <MenuItem
      key="signin"
      onClick={() => {
        history.push("/signin");
        handleMenuClose();
      }}
    >
      Sign in
    </MenuItem>,
    <MenuItem
      key="signup"
      onClick={() => {
        history.push("/signup");
        handleMenuClose();
      }}
    >
      Sign up
    </MenuItem>,
  ];

  const appMenu = (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        getContentAnchorEl={null}
        keepMounted
      >
        {hasRole("root") ? rootMenu : null}
        {hasRole("institute_admin") ? instituteAdminMenu : null}
        {userContext.user ? userMenu : anonymousMenu}
      </Menu>
    </div>
  );

  const searchBackdrop = (
    <div>
      <Backdrop className={classes.backdrop} open={searchBackdropOpen}>
        <Card style={{ flexGrow: 1 }}>
          <CardHeader
            action={
              <IconButton onClick={handleSearchClose}>
                <CloseIcon />
              </IconButton>
            }
            title={
              <div className={classes.backdropSearch}>
                <form action="/search">
                  <SearchBar variant="standard" theme={theme} />
                </form>
              </div>
            }
          />
        </Card>
      </Backdrop>
    </div>
  );

  const footer = (
    <footer className={classes.footer}>
      <Grid container>
        <Grid item sm={4} style={{ marginTop: theme.spacing(2) }}>
          <img
            src={brainsinjarsLogo}
            alt="brainsinjars"
            style={{ height: "5em" }}
          />
          {/* <Typography variant="h4">Brains in JARS</Typography> */}
          <Box mt={2} maxWidth="sm">
            <Typography variant="body1">
              Six brains in Six Jars, wired to function together.
            </Typography>
            <Copyright align="left" />
          </Box>
        </Grid>
        <Grid item sm={4} style={{ marginTop: theme.spacing(2) }}>
          <Typography variant="h6">Contact us</Typography>
          <Box mt={2} maxWidth="sm">
            <Box className={classes.footerContactRow}>
              <LocationOnIcon
                fontSize="large"
                style={{ marginRight: theme.spacing(1) }}
              />
              <span>
                <Typography variant="body2">
                  106 , A Wing, th Road, Chembur (east)
                </Typography>
                Mumbai, Maharashtra, India
              </span>
            </Box>
          </Box>
          <Box mt={2} maxWidth="sm">
            <Box className={classes.footerContactRow}>
              <PhoneIcon
                fontSize="large"
                style={{ marginRight: theme.spacing(1) }}
              />
              <span>
                <Typography variant="body1">+91 99999 88888</Typography>
              </span>
            </Box>
          </Box>
          <Box mt={2} maxWidth="sm">
            <Box className={classes.footerContactRow}>
              <EmailIcon
                fontSize="large"
                style={{ marginRight: theme.spacing(1) }}
              />
              <span>
                <Typography component="a" href="mailto:6brainsinjars@gmail.com">
                  6brainsinjars@gmail.com
                </Typography>
              </span>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={4} style={{ marginTop: theme.spacing(2) }}>
          <Typography variant="h6">About us</Typography>
          <Box mt={2} maxWidth="sm">
            <Box className={classes.footerContactRow}>
              <span>
                We are a bunch of idiots who are trying to learn full stack web
                development and get placed in good companies and this project is
                a part of this learning process.
              </span>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </footer>
  );

  return (
    <div className={classes.root}>
      <ElevationScroll {...props}>
        <AppBar
          className={classes.appBar}
          style={{
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
          }}
          color="primary"
        >
          <Toolbar className={classes.toolBar}>
            {/* <Typography
              className={classes.title}
              variant="h5"
              component="div"
              onClick={() => history.push("/")}
            >
              EdOmniscient
            </Typography> */}
            <img
              src={edOmniscientLogo}
              alt="EdOmniscient"
              style={{ height: "4em" }}
              onClick={() => history.push("/")}
            />

            <Hidden xsDown>
              <div className={classes.toolbarLinkBtns}>
                <Button
                  color="inherit"
                  size="large"
                  onClick={() => history.push("/institutes")}
                >
                  Institutes
                </Button>
                <Button
                  color="inherit"
                  size="large"
                  onClick={() => history.push("/courses")}
                >
                  Courses
                </Button>
                {/* <Button
                  color="inherit"
                  size="large"
                  onClick={() => history.push("/reviews")}
                >
                  Reviews
                </Button> */}
              </div>
            </Hidden>
            <div className={classes.toolBarAction}>
              <IconButton onClick={handleProfileOpen} color="inherit">
                {userContext.user ? <AccountCircleIcon /> : <LockIcon />}
              </IconButton>
              <Divider
                style={{
                  backgroundColor: "#ccc",
                  marginLeft: theme.spacing(1),
                  marginRight: theme.spacing(1),
                }}
                orientation="vertical"
                flexItem
              />
              <IconButton onClick={handleSearchToggle} color="inherit">
                <SearchIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />

      {/* search component - start */}
      <main id="main" className={classes.content}>
        <Switch>
          {/* <Route
            exact
            path="/institutes/:profileId/academics"
            render={(props) => <AcademicEvents theme={theme} {...props} />}
          />
          <Route
            exact
            path="/institutes/:profileId/courses"
            render={(props) => <CoursesList theme={theme} {...props} />}
          /> */}
          {/* <Route
            exact
            path="/placements"
            render={(props) => <NewPlacement theme={theme} {...props} />}
          />
          <Route
            exact
            path="/placements/admin"
            render={(props) => <Placement theme={theme} {...props} />}
          /> */}

          {userContext.user && (
            <Route
              exact
              path="/change_password"
              render={(props) => (
                <ChangePassword
                  user={userContext.user}
                  theme={theme}
                  {...props}
                />
              )}
            />
          )}

          {userContext.user && (
            <Route
              exact
              path="/myprofile"
              render={(props) => (
                <MainProfileWrapper
                  user={userContext.user}
                  theme={theme}
                  {...props}
                />
              )}
            />
          )}

          <Route
            exact
            path="/users/:profileId/"
            render={(props) => <MainProfileWrapper theme={theme} {...props} />}
          />
          {/* <Route
            exact
            path="/institutes/:profileId/reviews"
            render={(props) => <ReviewGrid theme={theme} {...props} />}
          />
          <Route
            exact
            path="/institutes/:profileId/reviews/form"
            render={(props) => <ReviewPage theme={theme} {...props} />}
          />
          <Route
            path="/institutes/:profileId/members"
            render={(props) => <MembersPage theme={theme} {...props} />}
          /> */}
          <Route
            path="/institutes/:profileId/gallery"
            render={(props) => <GalleryPage theme={theme} {...props} />}
          />
          <Route
            path="/institutes/:profileId"
            render={(props) => <InstituteProfile theme={theme} {...props} />}
          />
          <Route
            path="/institutes"
            render={(props) => <InstitutesPage theme={theme} {...props} />}
          />
          <Route
            path="/courses"
            render={(props) => <CoursesPage theme={theme} {...props} />}
          />
          {/* <Route
            path="/messages"
            render={(props) => <MessengerPage theme={theme} {...props} />}
          /> */}
          {/* <Route
            path="/search/:courseId"
            render={(props) => <SearchResults theme={theme} {...props} />}
          /> */}
          <Route
            path="/search"
            render={(props) => <SearchResults theme={theme} {...props} />}
          />
          <Route
            exact
            path="/"
            render={(props) => <HomePageSearch theme={theme} {...props} />}
          />
        </Switch>
      </main>

      {/* search component - end */}

      {appMenu}
      {searchBackdrop}
      {footer}
    </div>
  );
}
