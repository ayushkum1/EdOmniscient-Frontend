import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { makeStyles, TablePagination } from "@material-ui/core";
import CourseModal from "./CourseModal";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import { getCoursesOfInstitute } from "../../../../services/courses.service";
import { useRouteMatch } from "react-router";

const useStyles = makeStyles((theme) => ({
  headParaStyle: {
    textAlign: "start",
    background: "white",
  },
  headSlider: {
    margin: "20px",
  },
  courseCardGridStyle: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function CoursesList() {
  const [currentPage, setcurrentPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [courses, setcourses] = useState([]);
  const [description, setdescription] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState("");
  const [duration, setDuration] = useState("");
  const [fees, setFees] = useState("");

  const routeMatch = useRouteMatch();

  useEffect(() => {
    const instituteId = routeMatch.params.profileId;
    getCoursesOfInstitute(instituteId).then((result) => {
      setcourses(result.data);
    });
  }, []); //till i pass a url, as it has to refresh whenever there is a change in url and it is dependent on the url

  const handlePageChange = (event, newPage) => {
    setcurrentPage(newPage);
  };

  const handleButtonClick = (course) => {
    setModal(true);
    setdescription(course.description);
    setName(course.name);
    setId(course.id);
    setPhoto(course.photoUrl);
    setDuration(course.duration);
    setFees(course.fees);
  };

  const handleModalCloseButton = (course) => {
    setModal(false);
    setdescription("");
  };

  const batchSize = 6;

  const styles = useStyles();

  return (
    <>
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
        className={styles.headSlider}
      >
        <h1 className={styles.headParaStyle}>Courses Offered</h1>
      </Slide>

      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <Grid container spacing={2}>
          <Grid container spacing={2}>
            {courses
              .slice(
                currentPage * batchSize,
                currentPage * batchSize + batchSize
              )
              .map((course, i) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={i}
                  className={styles.courseCardGridStyle}
                >
                  <CourseCard
                    key={i}
                    courseName={course.name}
                    coursePhoto={course.photoUrl}
                    courseDescription={course.description}
                    onButtonClick={() => handleButtonClick(course)}
                    onModalCloseButtonClick={() =>
                      handleModalCloseButton(course)
                    }
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Slide>
      <div className="position-relative">
        <TablePagination
          component="div"
          count={courses.length}
          onChangePage={handlePageChange}
          page={currentPage}
          rowsPerPage={batchSize}
          rowsPerPageOptions={[]} //to remove that rows per page item
        />
      </div>
      <CourseModal
        open={modal}
        description={description}
        name={name}
        id={id}
        duration={duration}
        fees={fees}
        photo={photo}
        handleCloseClick={handleModalCloseButton}
      />
    </>
  );
}
