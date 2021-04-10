import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  ratingBox: {
    display: "flex",
    alignItems: "flex-start",
  },
  aboutBox: {
    overflow: "hidden",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-word",
  },
}));

function MemberCard({
  name,
  qualifications,
  passingYear,
  designation,
  currentOrg,
  rating,
  about,
}) {
  const classes = useStyles();

  return (
    <Card style={{ backgroundColor: grey[200] }}>
      <CardHeader
        title={
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            {name}
            <Box className={classes.ratingBox}>
              <Rating value={rating} precision={0.1} size="small" readOnly />
              <Typography variant="caption">{`(${rating})`}</Typography>
            </Box>
          </Box>
        }
        subheader={
          <Box>
            <Typography variant="body1">{`${designation} at ${currentOrg}`}</Typography>
            {`${qualifications} \u2022 ${passingYear}`}
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body1">About</Typography>
        <Typography variant="body2" className={classes.aboutBox}>
          {about}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MemberCard;
