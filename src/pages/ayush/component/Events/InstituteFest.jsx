import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { Carousel } from "react-bootstrap";

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

export default function InstituteFest() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Card className={classes.root}>
            <CardContent>
              <Carousel style={{ height: "fit-content" }}>
                <Carousel.Item>
                  <img
                    height="800px"
                    width="80%"
                    className="d-block w-100"
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/2ndpagepic.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <div style={{ background: "grey" }}>
                      <h3>Institute Fest Image 1</h3>
                      <p>This is the fest from ACTS PUNE</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    height="800px"
                    width="80%"
                    className="d-block w-100"
                    src="http://wonderfulmumbai.com/wp-content/uploads/2016/07/Mood_Indigo_College_Festival-550x390.jpg"
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <div style={{ background: "grey" }}>
                      <h3>Institute Fest Image 2</h3>
                      <p>This is the fest from ACTS PUNE</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    height="800px"
                    width="80%"
                    className="d-block w-100"
                    src="https://i.ytimg.com/vi/zPSQZ-1nIx4/maxresdefault.jpg"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <div style={{ background: "grey" }}>
                      <h3>Institute Fest Image 3</h3>
                      <p>This is the fest from ACTS PUNE</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
{
  /* <img
                height="800px"
                width="80%"
                alt="fest image"
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/2ndpagepic.jpg"
              /> */
}
