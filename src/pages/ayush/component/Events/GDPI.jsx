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

export default function GDPI() {
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
                    src="https://qph.fs.quoracdn.net/main-qimg-28a2eecfb755bfa4df9c5af2df56bb61.webp"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <div style={{ background: "grey" }}>
                      <h3>Group Discussion</h3>
                      <p>This is the Group Discussion Session from ACTS PUNE</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    height="800px"
                    width="80%"
                    className="d-block w-100"
                    src="http://etashasolutions.com/projects/wordpress/education-world-n-go/wp-content/uploads/2019/04/c7-2.jpg"
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <div style={{ background: "grey" }}>
                      <h3>Group Discussion</h3>
                      <p>This is the Group Discussion Session from ACTS PUNE</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    height="800px"
                    width="80%"
                    className="d-block w-100"
                    src="https://englishavenue450441769.files.wordpress.com/2018/06/captureaaa.png"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <div style={{ background: "grey" }}>
                      <h3>Personal Interview</h3>
                      <p>This is the Interview Session from ACTS PUNE</p>
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
