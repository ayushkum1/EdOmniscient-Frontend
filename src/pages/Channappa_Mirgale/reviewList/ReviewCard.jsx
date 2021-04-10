import React from "react";
import { Card, makeStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import { grey } from "@material-ui/core/colors";
// import SimpleRating from "./components/reviewList/StarRating";

import ShowMoreText from "react-show-more-text";
import SimpleRating from "./StarRating";

const useStyles = makeStyles(() => ({
  ratingBox: {
    display: "flex",
    alignItems: "flex-start",
  },

  aboutBox: {
    overflow: "hidden",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 20,
    wordBreak: "break-word",
  },
}));

function ReviewCard({ name, rating, content, courseName, modifiedDateTime }) {
  const classes = useStyles();

  const modifiedDate = new Date(modifiedDateTime);

  return (
    <Card style={{ backgroundColor: grey[200] }}>
      <CardHeader
        title={
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box className={classes.ratingBox}>
              <SimpleRating value={rating} />
              {/* <Typography variant="caption">{`(${rating})`}</Typography> */}
            </Box>
          </Box>
        }
        subheader={
          <Box>
            <Typography variant="body1">{name}</Typography>
            {`${courseName} \u2022 ${modifiedDate.toString()}`}
          </Box>
        }
      />
      <CardContent>
        <Typography
          component="div"
          variant="body1"
          className={classes.aboutBox}
        >
          <ShowMoreText
            /* Default options */
            lines={4}
            more="Show more"
            less="Show less"
            className="content-css"
            anchorClass="my-anchor-css-class"
            expanded={false}
            width={700}
          >
            {content}
          </ShowMoreText>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
