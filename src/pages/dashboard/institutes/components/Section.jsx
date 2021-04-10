import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  sectionContainer: {},
  sectionHeader: {
    position: "relative",
    top: "2.2em",
    left: "1em",
    display: "flex",
    width: "max-content",
    padding: theme.spacing(1, 3),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  sectionBody: {
    minHeight: "15em",
    padding: theme.spacing(4, 2, 2, 2),
  },

  editBtn: {
    position: "relative",
    top: "3.2em",
    right: "1em",
    width: "4em",
    height: "3em",
    backgroundColor: theme.palette.info.light,
    color: theme.palette.primary.contrastText,
  },
}));

function Section({ children, header }) {
  const classes = useStyles();

  return (
    <Container className={classes.sectionContainer} maxWidth="xl">
      {header && (
        <Paper elevation={6} className={classes.sectionHeader}>
          <Typography variant="h6">{header}</Typography>
        </Paper>
      )}

      <Paper elevation={4} className={classes.sectionBody}>
        {children}
      </Paper>
    </Container>
  );
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
  // header: PropTypes.string.isRequired,
};

export default Section;
