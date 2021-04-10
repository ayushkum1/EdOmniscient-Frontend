import {
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  FormControl,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { styles } from "../common/SelectStyles";
import { getAllCoursesShort } from "../../services/courses.service";

/* 
  The comments in this component apply to RegionSelect component as well.
  Both, CourseSelect and RegionSelect are almost similar components.
*/

// create styles using makeStyles hook.
// styles() function is used because,
// we are using same styles in two components i.e. CourseSelect and Region select
const useStyles = makeStyles((theme) => styles(theme));

function CourseSelect(props) {
  // get all classNames from useStyles() hook
  const classes = useStyles();

  // set the list of courses inside a state
  const [coursesList, setCoursesList] = useState([]);

  // isDisabled state to disable select component based on coursesList
  // if coursesList is empty then this component is disabled, enabled otherwise.
  const [isDisabled, setIsDisabled] = useState(true);

  // const getCoursesList = async () => {
  //   return await axios.get("/api/courses");
  // };

  useEffect(() => {
    getAllCoursesShort()
      .then((resp) => {
        setIsDisabled(resp.data === null || resp.data === []);
        setCoursesList([{ id: "", name: "" }, ...resp.data]);
        // if (props.course !== undefined) setCourse(props.course);
      })
      .catch((err) => {
        console.log("course select: ", err);
        setIsDisabled(true);
      });
  }, []);

  // Setting the position of drop down menu of course select component.
  const menuProps = {
    classes: {
      paper: classes.menuPaper,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  // Object 'destructuring'  of props Object.
  // This is standard ES6 syntax.
  const { value, changeHandler } = props;

  return (
    <>
      {/* FormControl because the ancestor component of CourseSelect is expected to be a form */}
      <FormControl
        required={!isDisabled}
        variant={props.variant}
        className={classes.root}
      >
        {/* Notice that id of InputLabel and labelId of Select match.
            This is required to tell Select component */}
        <InputLabel id="course-select-label">Course</InputLabel>
        <Select
          id="select-search-by-course"
          labelId="course-select-label"
          label="Course"
          disabled={isDisabled}
          name="course"
          onChange={changeHandler}
          defaultValue=""
          value={value}
          MenuProps={menuProps}
        >
          {/* Looping through coursesList and adding MenuItem(s) inside our select component */}
          {coursesList.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default CourseSelect;
