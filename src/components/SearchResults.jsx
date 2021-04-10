import React, { useState, useEffect, useRef } from "react";
import queryString from "query-string";
import {
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import CollegeDetailsCard from "./utility/CollegeDetailsCard";
import {
  Close as CloseIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import FilterComponent from "./utility/FilterComponent";
import SortComponent from "./utility/SortComponent";
import { useHistory } from "react-router-dom";
import { searchInstitutes } from "../services/institutes.service";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(4),
  },
  paperCommon: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  paperSearch: {
    padding: theme.spacing(1),
    flexGrow: 1,
    // width: "100%",
    minHeight: "5em",
  },

  filterPaper: {
    flexGrow: 1,
    margin: theme.spacing(1),
    // textAlign: "center",
    verticalAlign: "middle",
    maxHeight: "90%",
    overflowY: "auto",
  },
  fab: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      position: "fixed",
      // top: "calc(100% - 5em)",
      bottom: "1em",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.appBar + 1,
    overflow: "hidden",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

// This function makes an API call to our backend
// and fetches all colleges based on courseId
// and other filter options.
// async function getColleges(courseId, params) {
//   console.log("inside api caller");

//   return axios.get(`/api/search/${courseId}`, {
//     params: params /* { state: state, city: city, branch: branch } */,
//     paramsSerializer: (params) =>
//       qs.stringify(params, { arrayFormat: "repeat" }),
//   });
// }

function SearchResults(props) {
  const theme = props.theme;
  const classes = useStyles();

  // useHistory() hook is used to manipulate
  // browser history and route to desired pages.
  const history = useHistory();

  // A constant containing media query breakpoint of Mobile screens
  // i.e. width of 600px and down.
  const mobileBP = theme.breakpoints.down("sm");

  // This state holds the response received from API call
  const [response, setResponse] = useState([]);

  // useMediaQuery() hook updates the isMobile const when screen size changes.
  const isMobile = useMediaQuery(mobileBP);

  // Below State and handler functions are used for opening and closing
  // dialog of filter and sort when app is running in mobile view.
  // i.e. below 600px screen width. Refer: const mobileBP and isMobile.
  const [dialogOpen, setDialogOpen] = useState({ filter: false, sort: false });
  const handleFilterOpen = () => {
    setDialogOpen({ filter: true });
  };
  const handleFilterClose = () => {
    setDialogOpen({ filter: false });
  };
  const handleSortOpen = () => {
    setDialogOpen({ sort: true });
  };
  const handleSortClose = () => {
    setDialogOpen({ sort: false });
  };

  // A state to hold values of filters that are applied by FilterComponent.
  const [filters, setFilters] = useState({});
  // A state to hold value of sort that is applied by SortComponent.
  const [sort, setSort] = useState();

  // this useEffect() hook calls the API
  // and fetches new data from backend
  // whenever there is change in url.
  // Change in url is caused by,
  // Filter and Sort components
  // and rarely by manual input from user.
  useEffect(() => {
    const params = queryString.parse(props.location.search);
    let courses;
    if (Array.isArray(params.courses)) {
      courses = [...params.courses];
    } else {
      courses = [params.courses];
    }
    console.log(courses);
    searchInstitutes(courses, params.region, params.city, params.name)
      .then((promise) => {
        console.log("promise data: ", promise.data);
        setResponse(promise.data);
      })
      .catch((err) => console.error(err));
  }, [props.match.params.courseId, props.location.search]);

  // A reference to our form tag
  // This reference will be used by
  // our Filter and Sort component
  // to requestSubmit the form on Apply button click.
  const refForm = useRef();

  // A method to handle form submission.
  // This method uses the const returned by useHistory() hook
  // to change url which will cause the above useEffect() hook to execute.
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = queryString.stringify(filters);
    history.replace(
      `${props.match.url}?${query}${sort ? `&sortby=${sort}` : ""}`
    );
  };

  // just to avoid unused warning
  console.log(response);

  // A fragment of this component stored in a const
  // just to separate the code and make it more readable.
  const fab = (
    <Fab
      component="div"
      color="secondary"
      variant="extended"
      disableRipple
      className={classes.fab}
    >
      <ButtonGroup disableRipple variant="text">
        <Button
          style={{ width: "8em" }}
          startIcon={<FilterListIcon />}
          onClick={handleFilterOpen}
        >
          Filter
        </Button>
        {/* <Button
          style={{ width: "8em" }}
          startIcon={<SortIcon />}
          onClick={handleSortOpen}
        >
          Sort
        </Button> */}
      </ButtonGroup>
    </Fab>
  );

  // A fragment of this component stored in a const
  // just to separate the code and make it more readable.
  const filterComponent = (
    <FilterComponent
      refForm={refForm}
      handleApply={(applied) => {
        setFilters(applied);
        handleFilterClose();
      }}
      {...props}
    />
  );

  // A fragment of this component stored in a const
  // just to separate the code and make it more readable.
  const filterDialog = (
    <Backdrop open={dialogOpen.filter ?? false} className={classes.backdrop}>
      <Card className={clsx(classes.paperCommon, classes.filterPaper)}>
        <CardHeader
          title={<Typography variant="h6">Filter</Typography>}
          action={
            <IconButton onClick={handleFilterClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          {/* <div className={classes.paperCommon}> */}
          {filterComponent}
          {/* </div> */}
        </CardContent>
      </Card>
    </Backdrop>
  );

  // A fragment of this component stored in a const
  // just to separate the code and make it more readable.
  const sortComponent = (
    <SortComponent
      refForm={refForm}
      selected={sort}
      handleApply={(applied) => {
        setSort(applied);
        handleSortClose();
      }}
      {...props}
    />
  );

  // A fragment of this component stored in a const
  // just to separate the code and make it more readable.
  const sortDialog = (
    <Backdrop open={dialogOpen.sort ?? false} className={classes.backdrop}>
      <Card
        style={{ maxWidth: "calc(100% - 5em)" }}
        className={clsx(classes.paperCommon, classes.filterPaper)}
      >
        <CardHeader
          title={<Typography variant="h6">Sort by</Typography>}
          action={
            <IconButton onClick={handleSortClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        {/* <CardContent>{sortComponent}</CardContent> */}
      </Card>
    </Backdrop>
  );

  // This function returns our component
  // Once again, used to make our code readable.
  const searchResultsPage = () => {
    return (
      <div>
        <form ref={refForm} onSubmit={handleSubmit}>
          <Grid container justify="space-evenly">
            <Grid item xs={12} md={3}>
              {/* Conditional rendering based on screen size.
                  On Desktop/Laptop screen left side filtering component is not rendered.
                  Instead a filterDialog is rendered. */}
              {isMobile ? (
                filterDialog
              ) : (
                <div style={{ margin: theme.spacing(1) }}>
                  {filterComponent}
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              {/* Conditional rendering based on screen size.
                  On mobile screen top side sorting component is not rendered.
                  Instead a sortDialog is rendered. */}
              {/* {isMobile ? (
                sortDialog
              ) : (
                <Paper className={classes.paperCommon}>
                  <Typography style={{ lineHeight: 0 }} variant="overline">
                    Sort by
                  </Typography>
                  <hr />
                  {sortComponent}
                </Paper>
              )} */}

              {response.map((college) => {
                return (
                  <Grid item xs={12} key={college.instituteId}>
                    <CollegeDetailsCard
                      className={`${classes.paperCommon}`}
                      theme={theme}
                      college={college}
                    ></CollegeDetailsCard>
                  </Grid>
                );
              })}
            </Grid>
            {fab}
          </Grid>
          {/* <div>{testSearchResults()}</div> */}
        </form>
      </div>
    );
  };

  // fake data used to show how this component will look.

  // const testSearchResults = () => {
  //   return (
  //     <div>
  //       <h2>This is results</h2>
  //       <br />
  //       <h3>
  //         {/* This is extracted query string: course={course}, state={state} */}
  //       </h3>
  //       <br />
  //       <h3>This is response from backend: </h3>
  //       <h3>
  //         {response === undefined || response === ""
  //           ? "No content received from server"
  //           : response.map((val) => <p key={val.id}>{val.name}</p>)}
  //       </h3>
  //     </div>
  //   );
  // };

  //   return testSearchResults();

  // call the searchResultsPage() function which returns our main component.
  return searchResultsPage();
}

export default SearchResults;
