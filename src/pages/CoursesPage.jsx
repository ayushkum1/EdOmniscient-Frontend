import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Box, Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getAllCoursesShort } from "../services/courses.service";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://picsum.photos/id/1073/1920/900?grayscale')`,
    height: "80vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
}));

function CoursesPage() {
  const classes = useStyles();
  const [coursesList, setCoursesList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllCoursesShort()
      .then((resp) => {
        setCoursesList(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ margin: "0.5em" }}>
      <Box className={classes.hero}>
        <Grid
          style={{ margin: "0.5em" }}
          container
          spacing={1}
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          {coursesList.map((course) => (
            <Grid item sm={3} key={course.id}>
              <Button
                onClick={() => history.push(`/search?courses=${course.id}`)}
                fullWidth
                variant="contained"
              >
                {course.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default CoursesPage;
