import React from "react";
import {
  makeStyles,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    // position: "absolute",
    width: "1000px", //to accomodate all the views
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  dialogStyle: {
    height: "auto",
    width: "auto",
    overflow: "scroll",
  },
  courseImageStyle: {
    display: "flex",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: "1.5em",
    margin: "8px",
  },

  boldTextColorStyle: {
    color: "#696969",
  }, //needed this as only the bold part i wanted of dark color and not light grey

  paraMarginStyle: {
    margin: "8px",
  },

  courseAndFeesStyle: {
    textAlign: "right",
    fontSize: "1.5em",
    margin: "8px",
  },

  buttonStyle: {
    height: "fit-content",
    width: "fit-content",
    float: "right",
    margin: "8px",
  },
  imageStyle: {
    margin: "8px",
    justifyContent: "center",
    alignSelf: "center",
    height: "500px",
    width: "500px",
  },
}));

export default function CourseModal({
  open,
  description,
  name,
  id,
  duration,
  fees,
  photo,
  handleCloseClick,
}) {
  const styles = useStyles();

  return (
    <Container maxWidth="lg">
      <Dialog
        open={open}
        onClose={handleCloseClick}
        aria-labelledby="course-viewmore-dialog"
        maxWidth="lg"
      >
        <DialogTitle id="course-form">
          {/* could have added title here, but it wasnt looking good */}
          <Button
            className={styles.buttonStyle}
            variant="outlined"
            color="secondary"
            onClick={handleCloseClick}
          >
            X
          </Button>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Grid container spacing={2} className={styles.paper}>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} md={6} lg={6} xl={6}>
                            <p className={styles.textStyle}>
                              <b className={styles.boldTextColorStyle}>
                                Course Name:{" "}
                              </b>
                              {name}
                            </p>
                          </Grid>
                          <Grid item xs={6} md={6} lg={6} xl={6}>
                            <p className={styles.courseAndFeesStyle}>
                              <b className={styles.boldTextColorStyle}>
                                Course ID:{" "}
                              </b>
                              {id}
                            </p>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                          {/* add a style to align it center */}
                          <Grid
                            item
                            md={12}
                            lg={12}
                            xs={12}
                            xl={12}
                            className={styles.courseImageStyle}
                          >
                            <img className={styles.imageStyle} src={photo} />
                          </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={12} lg={12} xl={12}>
                            <p className={styles.textStyle}>
                              <b className={styles.boldTextColorStyle}>
                                About:
                              </b>
                            </p>
                            <p className={styles.paraMarginStyle}>
                              {description}
                            </p>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid item xs={6} md={6} lg={6} xl={6}>
                            <p className={styles.textStyle}>
                              <b className={styles.boldTextColorStyle}>
                                Duration:{" "}
                              </b>
                              {duration} Months
                            </p>
                          </Grid>
                          <Grid item xs={6} md={6} lg={6} xl={6}>
                            <p className={styles.courseAndFeesStyle}>
                              <b className={styles.boldTextColorStyle}>
                                Fees:{" "}
                              </b>
                              ₹{fees}/-
                            </p>
                          </Grid>
                        </Grid>

                        {/* <CourseModal /> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
