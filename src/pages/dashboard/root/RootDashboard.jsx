import React, { useState } from "react";
import {
  AppBar,
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
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import RateReviewIcon from "@material-ui/icons/RateReview";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import { Route, Switch, useHistory } from "react-router-dom";
import ManageInstitutes from "./ManageInstitutes";
import ManageCourses from "./ManageCourses";
import ManageUsers from "./ManageUsers";
import ManageReviews from "./ManageReviews";
import RootMain from "./RootMain";

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
    padding: theme.spacing(0, 1),
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
}));

function RootDashboard(props) {
  const theme = /* props.theme */ useTheme();
  const classes = useStyles();

  const rootDashboardRoute = "/dashboard/root";
  const history = useHistory();

  const mobileBP = useMediaQuery(theme.breakpoints.down("xs"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState(props.location.pathname);

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
      route: `${rootDashboardRoute}`,
    },
    {
      text: "Institutes",
      icon: <AccountBalanceIcon fontSize="small" />,
      route: `${rootDashboardRoute}/institutes`,
    },
    {
      text: "Courses",
      icon: <ImportContactsIcon fontSize="small" />,
      route: `${rootDashboardRoute}/courses`,
    },
    {
      text: "Reviews",
      icon: <RateReviewIcon fontSize="small" />,
      route: `${rootDashboardRoute}/reviews`,
    },
    {
      text: "Users",
      icon: <PeopleIcon fontSize="small" />,
      route: `${rootDashboardRoute}/users`,
    },
  ];

  const drawer = (
    <>
      <div className={classes.drawerHeader}>
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
      {/* <SnackbarProvider> */}
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

      <main className={classes.content}>
        <Switch>
          <Route
            path={`${rootDashboardRoute}/institutes`}
            render={(props) => <ManageInstitutes theme={theme} {...props} />}
          />
          <Route
            path={`${rootDashboardRoute}/courses`}
            render={(props) => <ManageCourses {...props} />}
          />
          <Route
            path={`${rootDashboardRoute}/reviews`}
            render={(props) => <ManageReviews {...props} />}
          />
          <Route
            path={`${rootDashboardRoute}/users`}
            render={(props) => <ManageUsers {...props} />}
          />
          <Route path={rootDashboardRoute} render={() => <RootMain />} />
        </Switch>
      </main>
      {/* </SnackbarProvider> */}
    </div>
  );
}

export default RootDashboard;
