//this is not being used, but i am not deleting it too right now!!!

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function InstituteCurricularActivities() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Card className={classes.root}>
            <CardContent>
              <img
                height="800px"
                width="80%"
                alt="fest image"
                src="https://www.jainuniversity.ac.in/application/themes/events/assets/images/prospective-student/sports2.jpg"
              />
            </CardContent>
            <CardActions style={{ float: "right" }}>
              <Button
                variant="contained"
                color="grey"
                // onClick={onButtonClick}
              >
                <img
                  src="https://www.vippng.com/png/detail/411-4111873_arrow-pointing-right-svg-png-icon-free-download.png"
                  height="40px"
                  width="100px"
                />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
