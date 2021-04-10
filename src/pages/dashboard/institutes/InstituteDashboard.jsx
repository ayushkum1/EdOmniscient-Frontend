import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { Route, Switch, useHistory } from "react-router-dom";
import ManageGallery from "./ManageGallery";
import MainDashboard from "./MainDashboard";
import ManageMembers from "./ManageMembers";
import ManageCompanies from "./ManageCompanies";
import { SnackbarProvider } from "notistack";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import BusinessIcon from "@material-ui/icons/Business";
import WorkIcon from "@material-ui/icons/Work";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import Placement from "../../Kanchan Harjani/PlacementInstituteAdmin/pages/Placements/Placement";
import {
  getInstituteByAdmin,
  getInstituteById,
} from "../../../services/institutes.service";
import { useToken } from "../../../services/useToken";
import UserContext from "../../../context/UserContext";
import Container from "@material-ui/core/Container";
import EditInstituteDialog from "./EditInstituteDialog";
import ManageAcademics from "./ManageAcademics";
import ManageInstituteCourses from "./ManageInstituteCourses";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1,
    boxShadow:
      "0 10px 30px -12px rgb(0 0 0 / 42%), 0 4px 25px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-around",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      // display: "none",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: theme.spacing(8),
    // [theme.breakpoints.down("xs")]: {
    //   marginTop: theme.spacing(10),
    // },
  },

  actions: {
    display: "flex",
    flexDirection: "row-reverse",
  },
}));

function InstituteDashboard(props) {
  const theme = useTheme();
  const classes = useStyles();

  const instituteDashboardRoute = "/dashboard/institute";
  const history = useHistory();

  const mobileBP = useMediaQuery(theme.breakpoints.down("xs"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState(null);

  const { token } = useToken();
  const userCtx = useContext(UserContext);

  const [curInst, setCurInst] = useState(null);
  const [institute, setInstitute] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    getInstituteByAdmin(token, userCtx.user?.email)
      .then((resp) => {
        console.log(resp.data);
        setCurInst(resp.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    return () => {
      setCurInst(null);
    };
  }, [token]);

  useEffect(() => {
    getInstituteById(curInst)
      .then((resp) => {
        console.log(resp.data);
        setInstitute(resp.data);
      })
      .catch((err) => {
        setInstitute({});
      });
    return () => {
      setInstitute(null);
    };
  }, [token, curInst, props, refresh]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleRouteChange = (route) => {
    history.push(route);
    setActive(route);
  };

  function viewName() {
    const pathname = props.location.pathname;
    const path = props.match.path;
    let viewName = pathname.substring(path.length + 1, pathname.length);
    // viewName = viewName.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    //   return g1.toUpperCase() + g2.toLowerCase();
    // });
    return viewName;
  }

  const drawerItem = [
    {
      text: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      route: `${instituteDashboardRoute}`,
    },
    {
      text: "Courses",
      icon: <ImportContactsIcon fontSize="small" />,
      route: `${instituteDashboardRoute}/courses`,
    },
    {
      text: "Placements",
      icon: <WorkIcon fontSize="small" />,
      route: `${instituteDashboardRoute}/placements`,
    },
    {
      text: "Gallery",
      icon: <PhotoLibraryIcon fontSize="small" />,
      route: `${instituteDashboardRoute}/gallery`,
    },
    {
      text: "Academic Calendar",
      icon: <EventAvailableIcon fontSize="small" />,
      route: `${instituteDashboardRoute}/academics`,
    },
    {
      text: "Members",
      icon: <PeopleIcon fontSize="small" />,
      route: `${instituteDashboardRoute}/members`,
    },
    {
      text: "Companies",
      icon: <BusinessIcon fontSize="small" />,
      route: `${instituteDashboardRoute}/companies`,
    },
  ];

  const drawer = (
    <>
      <div className={classes.drawerHeader}>
        <Avatar
          src={institute !== null ? institute.profilePicUrl : ""}
          alt="logo"
          style={{ width: "60px", height: "60px" }}
        />
        <Typography variant="h6" color="initial">
          EdOmniscient
        </Typography>
      </div>
      <Divider variant="middle" />
      <List style={{ height: "inherit" }}>
        {drawerItem.map((item, idx) => {
          return (
            <ListItem
              key={idx}
              button
              selected={active == item.route}
              onClick={() => {
                handleRouteChange(item.route);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}

        <Divider variant="middle" />
        <footer
          style={{
            minWidth: "100%",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            bottom: 0,
          }}
        >
          <Divider variant="middle" />
          <ListItem
            button
            selected={active == "/"}
            onClick={() => {
              handleRouteChange("/");
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </footer>
      </List>
    </>
  );

  return (
    <div className={classes.root}>
      <SnackbarProvider>
        <AppBar
          position="fixed"
          color="primary"
          elevation={!mobileBP ? 4 : 2}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Typography style={{ fontSize: "1.2rem" }} variant="overline">
              {viewName() !== "" ? `Manage ${viewName()}` : "Dashboard"}
            </Typography>
            {viewName() === "" && (
              <Container className={classes.actions} disableGutters>
                <Button
                  onClick={() => setEditOpen(true)}
                  variant="contained"
                  color="secondary"
                >
                  <EditIcon />
                </Button>
              </Container>
            )}
          </Toolbar>
        </AppBar>

        <nav>
          <Drawer
            className={classes.drawer}
            variant={mobileBP ? "temporary" : "permanent"}
            anchor="left"
            open={drawerOpen || !mobileBP}
            onClose={() => setDrawerOpen(false)}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </nav>

        {viewName() === "" && institute && (
          <EditInstituteDialog
            open={editOpen}
            onClose={() => setEditOpen(false)}
            token={token}
            curInstitute={curInst}
            institute={institute}
            refresh={handleRefresh}
            {...props}
          />
        )}

        <main className={classes.content}>
          <Switch>
            <Route
              path={`${instituteDashboardRoute}/academics`}
              render={(props) => (
                <ManageAcademics
                  curInstitute={curInst}
                  theme={theme}
                  {...props}
                />
              )}
            />
            <Route
              path={`${instituteDashboardRoute}/gallery`}
              render={(props) => (
                <ManageGallery
                  curInstitute={curInst}
                  theme={theme}
                  {...props}
                />
              )}
            />
            {/* <Route
              path={`${instituteDashboardRoute}/reviews`}
              render={(props) => (
                <ManageReview curInstitute={curInst} {...props} />
              )}
            /> */}
            <Route
              path={`${instituteDashboardRoute}/members`}
              render={(props) => (
                <ManageMembers curInstitute={curInst} {...props} />
              )}
            />
            <Route
              path={`${instituteDashboardRoute}/placements`}
              render={(props) => (
                <Placement curInstitute={curInst} {...props} />
              )}
            />
            <Route
              path={`${instituteDashboardRoute}/courses`}
              render={(props) => (
                <ManageInstituteCourses curInstitute={curInst} {...props} />
              )}
            />
            <Route
              path={`${instituteDashboardRoute}/companies`}
              render={(props) => (
                <ManageCompanies curInstitute={curInst} {...props} />
              )}
            />
            <Route
              path={instituteDashboardRoute}
              render={() => (
                <MainDashboard
                  curInstitute={curInst}
                  institute={institute}
                  {...props}
                />
              )}
            />
          </Switch>
        </main>
      </SnackbarProvider>
    </div>
  );
}

export default InstituteDashboard;
