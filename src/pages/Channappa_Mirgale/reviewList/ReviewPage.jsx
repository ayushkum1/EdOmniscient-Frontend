import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Pagination from "@material-ui/lab/Pagination";
import ReviewCard from "./ReviewCard";
import { getReviews } from "../services/review-helper";

// import getReviews from "../services/axios-helper"
const useStyles = makeStyles((theme) => ({
  paper: {
    height: "5em",
    textAlign: "center",
    fontSize: "24px",
    padding: theme.spacing(2),
    backgroundColor: grey[200],
  },
  rounded: {
    borderRadius: "0.5em",
  },
  divider: {
    margin: "1em",
  },
}));

function ReviewGrid(props) {
  const { token } = props;
  const classes = useStyles();
  const history = useHistory();
  const routeMatch = useRouteMatch();

  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [review, setReview] = useState([]);

  const totalRecords = review.length;
  const pageSize = 10;
  useEffect(() => {
    const instId = routeMatch.params.profileId;
    console.log(routeMatch.params.profileId);
    retrieveReview(instId);
  }, [routeMatch.params.profileId]);

  const retrieveReview = (instId) => {
    getReviews(token, instId)
      .then((response) => {
        setReview(response.data);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        setReview([]);
      });
  };

  console.log("review", review);

  useEffect(() => {
    const offset = page * pageSize - pageSize;
    const limit = Math.min(totalRecords - offset, pageSize);
    setRecords(review.slice(offset, offset + limit));
  }, [page, review]);

  const handlePageChange = (event, value) => {
    setPage(value);

    setTimeout(() => {
      document
        .querySelector("#scroll-to-top-anchor-review")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div id="scroll-to-top-anchor-review" style={{ padding: "1em" }}>
      <Grid container spacing={2}>
        {[...records].map((i) => {
          return (
            <Grid key={i.id} item xs={12}>
              <Grid item xs={12}>
                <ReviewCard
                  name={i.name}
                  rating={i.rating}
                  content={i.content}
                  courseName={i.courseName}
                  modifiedDateTime={i.modifiedDateTime}
                />
              </Grid>
              <Divider variant="middle" className={classes.divider} />
            </Grid>
          );
        })}
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={Math.floor(
              totalRecords / pageSize + (totalRecords % pageSize !== 0 ? 1 : 0)
            )}
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default ReviewGrid;
