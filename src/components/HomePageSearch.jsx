import React, { useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {
  Search as SearchIcon,
  AccountBalance as AccountBalanceIcon,
  RateReview as RateReviewIcon,
  ImportContacts as ImportContactsIcon,
} from "@material-ui/icons";
import StateSelect from "./utility/RegionSelect";
import CourseSelect from "./utility/CourseSelect";
import { useHistory } from "react-router-dom";
import bgHomePage from "../assets/8747.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    margin: theme.spacing(10, 1, 1, 1),
  },
  quickLinksRoot: {
    marginTop: "3em",
    [theme.breakpoints.up("sm")]: {
      marginTop: "5em",
    },
  },
  quickLinksBtn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "6em",
    [theme.breakpoints.up("sm")]: {
      height: "8em",
    },

    "&:hover": {
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2)," +
        "0px 1px 1px 0px rgba(0,0,0,0.14)," +
        "0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: 30,
    [theme.breakpoints.up("md")]: {
      fontSize: 40,
    },
  },
  image: {
    backgroundImage: `url(${bgHomePage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
}));

function HomePageSearch(props) {
  const theme = props.theme;
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const blankFormData = { course: "", region: "" };
  const [formData, setFormData] = useState(blankFormData);

  const handleCourseChange = (event) => {
    setFormData({ ...formData, course: event.target.value });
  };

  const handleStateChange = (event) => {
    setFormData({ ...formData, region: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(
      `/search?courses=${formData.course}&region=${formData.region}`
    );
    setFormData(blankFormData);
  };

  const searchComponent = (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justify="center" alignItems="flex-end">
        <Grid item xs={10} sm={3} md={3} lg={2}>
          <CourseSelect
            variant="standard"
            theme={theme}
            value={formData.course}
            changeHandler={handleCourseChange}
          />
        </Grid>
        <Grid item xs={10} sm={3} md={3} lg={2}>
          <StateSelect
            variant="standard"
            theme={theme}
            value={formData.region}
            changeHandler={handleStateChange}
          />
        </Grid>
        <Grid item xs={10} sm={3} md={3} lg={2}>
          <Button
            type="submit"
            startIcon={<SearchIcon />}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disableElevation
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const quickLinks = (
    <React.Fragment>
      <Grid
        container
        spacing={isMobile ? 1 : 2}
        justify="center"
        className={classes.quickLinksRoot}
      >
        <Grid item xs={4} sm={3} lg={2}>
          <Button
            disableElevation
            variant="contained"
            fullWidth
            onClick={() => history.push("/institutes")}
            className={classes.quickLinksBtn}
          >
            <AccountBalanceIcon className={classes.icon} />
            <Typography variant="overline">Institutes</Typography>
          </Button>
        </Grid>
        <Grid item xs={4} sm={3} lg={2}>
          <Button
            disableElevation
            variant="contained"
            fullWidth
            onClick={() => history.push("/courses")}
            className={classes.quickLinksBtn}
          >
            <ImportContactsIcon className={classes.icon} />
            <Typography variant="overline">Courses</Typography>
          </Button>
        </Grid>
        {/* <Grid item xs={4} sm={3} lg={2}>
          <Button
            disableElevation
            variant="contained"
            fullWidth
            onClick={() => history.push("/reviews")}
            className={classes.quickLinksBtn}
          >
            <RateReviewIcon className={classes.icon} />
            <Typography variant="overline">Reviews</Typography>
          </Button>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );

  const bgComponent = (
    <Grid container style={{ minHeight: "30em" }}>
      <Grid item xs={12} className={classes.image} />
    </Grid>
  );

  const homePage = () => {
    return (
      <div className={classes.root}>
        {searchComponent}
        {quickLinks}
        {bgComponent}
      </div>
    );
  };

  return homePage();
}

export default HomePageSearch;
