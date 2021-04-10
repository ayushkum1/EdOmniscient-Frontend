import React from "react";
import { Card, makeStyles, CardMedia, Button } from "@material-ui/core";

const useStyles = makeStyles({
  base: {
    maxWidth: 545,
    height: "fit-content",
    padding: "1%",
    margin: "10px",
    border: "1px black solid",
    boxShadow: "5px 5px 5px grey",
  },
  media: {
    height: 140,
  },
  buttonStyle: {
    float: "right",
  },
});

export default function CourseCard({
  courseName,
  courseDescription,
  coursePhoto,
  onButtonClick,
}) {
  const styles = useStyles();

  return (
    <div>
      <Card className={styles.base}>
        <CardMedia
          className={styles.media}
          image={coursePhoto}
          title={courseName}
        />
        <h2>{courseName}</h2>
        {courseDescription.length > 140 ? (
          <p>{courseDescription.slice(0, 140).concat("...")}</p>
        ) : (
          <p>{courseDescription}</p>
        )}

        <Button
          variant="outlined"
          color="secondary"
          onClick={onButtonClick}
          className={styles.buttonStyle}
        >
          View More
        </Button>
      </Card>
    </div>
  );
}
