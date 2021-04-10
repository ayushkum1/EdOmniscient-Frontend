import React from "react";
import Typography from "@material-ui/core/Typography";
import forbiddenImg from "../../assets/forbidden.svg";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: theme.palette.error.light,
  },
}));

function ForbiddenPage() {
  const classes = useStyles();
  const theme = useTheme();
  const mobileBP = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();
  return (
    <div className={classes.root}>
      <img
        src={forbiddenImg}
        alt="forbidden"
        style={{ maxWidth: mobileBP ? "80vw" : "55vw" }}
      />
      <Typography
        variant={mobileBP ? "h4" : "h2"}
        className={classes.errorText}
      >
        403 Forbidden
      </Typography>
      <Button
        onClick={() => history.goBack()}
        variant="text"
        color="primary"
        style={{ marginTop: "2em" }}
      >
        Go Back
      </Button>
    </div>
  );
}

export default ForbiddenPage;
