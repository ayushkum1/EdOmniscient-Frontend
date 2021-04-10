import React, { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { regionList, cityList } from "../common/constants";
import { getAllCoursesShort } from "../../services/courses.service";

// Once again, creating styles for our components.
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details: {
    // padding: theme.spacing(1),
    maxHeight: "20em",
    overflowY: "auto",
  },
  btns: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
}));

function FilterComponent(props) {
  const theme = props.theme;
  // Getting all classNames from useStyles() hook.
  const classes = useStyles(theme);

  const blankFilters = { region: "", city: "", courses: [] };

  const { region, city, courses } = queryString.parse(props.location.search);

  const [filter, setFilter] = useState({
    region: region ?? "",
    city: city ?? "",
    courses: courses ?? [],
  });

  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    getAllCoursesShort().then((resp) => setCoursesList(resp.data));
  }, []);

  const handleApply = (event) => {
    refBtn.current?.setAttribute("disabled", "disabled");
    props.handleApply(filter);
    console.log("apply", filter);
    setTimeout(() => {
      props.refForm.current.requestSubmit();
    }, 10);
  };
  const handleClear = (event) => {
    setFilter(blankFilters);
    props.handleApply(blankFilters);
    console.log("clear", filter);
    setTimeout(() => {
      props.refForm.current.requestSubmit();
    }, 10);
  };

  // Below functions handle change events
  // of filter components. I.e. RadioAccordion of Region and City.
  const handleRegionChange = (event) => {
    setFilter({ ...filter, city: "", region: event.target.value });
  };
  const handleCityChange = (event) => {
    setFilter({ ...filter, region: "", city: event.target.value });
  };

  // Once upon a time this function handled the change events
  // of CheckboxAccordion component.
  // Since, CheckboxAccordion is out of duty,
  // this function has no job to do.
  // It is kept in the code based as it might serve a purpose
  // in the future.
  const handleBranchChange = (event) => {
    let courses = filter.courses;
    console.log(event.target.value);
    const val = event.target.value;

    if (Array.isArray(courses)) {
      courses = [...courses];
    } else {
      courses = [courses];
    }

    const newChecked = courses.includes(val)
      ? courses.filter((b) => b !== val)
      : [...courses, val];
    setFilter({ ...filter, courses: newChecked });
    // setCheckedBranches(newChecked);
  };

  const refBtn = useRef();

  return (
    <React.Fragment>
      <div className={classes.btns}>
        <Button ref={refBtn} size="small" variant="text" onClick={handleClear}>
          Clear
        </Button>
        <Button
          ref={refBtn}
          size="small"
          variant="contained"
          color="secondary"
          // type="submit"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
      <RadioAccordion
        list={regionList}
        heading="Region"
        name="region"
        value={filter.region}
        changeHandler={handleRegionChange}
        classes={classes}
      />
      <RadioAccordion
        list={cityList}
        heading="City"
        name="city"
        value={filter.city}
        changeHandler={handleCityChange}
        classes={classes}
      />
      <CheckBoxAccordion
        list={coursesList}
        heading="courses"
        name="courses"
        courses={filter.courses}
        changeHandler={handleBranchChange}
        classes={classes}
      />
    </React.Fragment>
  );
}

function RadioAccordion(props) {
  const { list, heading, name, value, changeHandler, classes } = props;
  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{heading}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <FormControl component="fieldset" style={{ flexGrow: 1 }}>
            <RadioGroup name={name} value={value} onChange={changeHandler}>
              {list.map((value) => {
                return (
                  <React.Fragment key={value}>
                    <Divider variant="fullWidth" />
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  </React.Fragment>
                );
              })}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

// This component is currently not in use
// as we limited our project scope to CDAC Institutes only.
// This Component is kept here because there might be
// a possibility of using it in the future.
function CheckBoxAccordion(props) {
  const { list, heading, name, courses, changeHandler, classes } = props;

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{heading}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <FormControl component="fieldset" style={{ flexGrow: 1 }}>
            <FormGroup>
              {list.map((l) => {
                return (
                  <React.Fragment key={l.id}>
                    <Divider variant="fullWidth" />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={courses.includes(l.id.toString())}
                          value={l.id}
                          onChange={changeHandler}
                          name={name}
                        />
                      }
                      label={l.name}
                    />
                  </React.Fragment>
                );
              })}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FilterComponent;
