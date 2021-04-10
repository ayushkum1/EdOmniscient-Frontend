import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

function YourReviews(props) {
  const [rating, setRating] = React.useState(0);
  const next = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <div>
      <Typography variant="h4" align="center">
        Review About Your College
        <RateReviewIcon />
      </Typography>
      <Container maxWidth="sm">
        <Paper elevation={5} style={{ padding: "2em" }}>
          <Grid container spacing={3} style={{ alignItems: "flex-end" }}>
            <Grid item xs={12}>
              <Typography variant="body1">Your Rating</Typography>
              <Rating
                value={rating}
                precision={0.5}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <Typography Variant="h5">Review</Typography> */}
              <TextField
                fullWidth
                label="Review"
                aria-label="minimum height"
                multiline
                rows={4}
                placeholder="Review Here your College"
              />
            </Grid>
            <Grid item>
              <Button
                label="back"
                variant="contained"
                color="secondary"
                onClick={back}
              >
                Back
              </Button>
              <Button
                label="next"
                variant="contained"
                color="primary"
                onClick={next}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default YourReviews;
