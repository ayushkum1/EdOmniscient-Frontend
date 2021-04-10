import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Rating } from "@material-ui/lab";
import {
  addReviewRecord,
  updateReviewRecord,
} from "../../Channappa_Mirgale/services/review-helper";
import { useSnackbar } from "notistack";

/*
 * This is just a wrapper to src/pages/review/ReviewForm.jsx
 */

function WriteReviewForm(props) {
  const {
    open,
    onClose,
    instituteId,
    token,
    user,
    userReview,
    snackbarProps,
    refresh,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const [valid, setValid] = useState({ rating: true, content: true });

  useEffect(() => {
    setRating(userReview.rating ? userReview.rating : -1);
    setContent(userReview.content ? userReview.content : "");
    return () => {};
  }, [props]);

  const validate = () => {
    let valid = {
      rating: rating > 0,
      content: content.length > 50 && content.length < 2000,
    };

    setValid(valid);

    return Object.values(valid).every((x) => x === true);
  };

  const handleSubmit = () => {
    if (validate()) {
      if (!userReview.id) {
        console.log("add");
        addReviewRecord(token, instituteId, {
          userEmail: user.email,
          memberId: user.memberId,
          rating: rating,
          content: content,
        })
          .then((resp) => {
            enqueueSnackbar(
              "Review added successfully!",
              snackbarProps("success")
            );
            refresh();
          })
          .catch((err) => {
            enqueueSnackbar(
              "Error occured while posting this review",
              snackbarProps("error")
            );
          })
          .finally(() => handleClose());
      } else {
        console.log("update");
        updateReviewRecord(token, instituteId, userReview.id, {
          userEmail: user.email,
          memberId: user.memberId,
          rating: rating,
          content: content,
        })
          .then((resp) => {
            enqueueSnackbar(
              "Review updated successfully!",
              snackbarProps("success")
            );
            refresh();
          })
          .catch((err) => {
            enqueueSnackbar(
              "Error occured while posting this review",
              snackbarProps("error")
            );
          })
          .finally(() => handleClose());
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Review this institute</DialogTitle>
      <DialogContent>
        {/* <ReviewForm {...props} /> */}
        <Grid container spacing={1}>
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <Rating
              emptyLabelText="aslkdjf"
              name="rating"
              value={rating}
              //   precision={0.5}
              onChange={(e, newRating) => {
                setRating(newRating);
              }}
            />
            <Box style={{ color: "red" }} ml={2}>
              {!valid.rating ? "Please select a rating" : ""}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={!valid.content}
              helperText={
                !valid.content
                  ? "Review content should be at least 50 characters and at most 2000 characters"
                  : ""
              }
              fullWidth
              name="content"
              label="Review"
              aria-label="minimum height"
              multiline
              rows={10}
              placeholder="Write a review (50 - 2000 characters)"
              variant="filled"
              inputProps={{
                minLength: 50,
                maxLength: 2000,
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end", gap: "1em" }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default WriteReviewForm;
