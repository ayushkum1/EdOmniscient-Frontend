import React from "react";
import { makeStyles, Paper, Typography, useTheme } from "@material-ui/core";
import Section from "./components/Section";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    // height: "300px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 300,
    lineHeight: "3rem",
    // color: theme.palette.primary.contrastText,
  },
  subtitle: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "2rem",
    // color: theme.palette.primary.contrastText,
  },
  sectionContainer: {},
  sectionHeader: {
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
}));

const MainDashboard = (props) => {
  const { curInstitute, institute } = props;
  const classes = useStyles();
  const theme = useTheme();

  const titleBg = {
    backgroundImage: `url(${institute?.coverPicUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "300px",
    justifyContent: "center",
    display: "flex",
    flexFlow: "column",
  };

  return (
    <div>
      <div style={titleBg}>
        <Paper
          elevation={4}
          className={classes.titleContainer}
          style={{
            width: "100%",
            padding: theme.spacing(1),
            backgroundColor: "#fafafa66",
          }}
        >
          <Typography variant="overline" className={classes.title}>
            {institute?.name}
          </Typography>
          <Typography variant="overline" className={classes.subtitle}>
            {institute?.nick}
          </Typography>
        </Paper>
      </div>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={8}>
          <Section header="About">
            <Typography variant="body1">{institute?.about}</Typography>
          </Section>

          <Section header="About Placements">
            <Typography variant="body1">
              {institute?.aboutPlacements}
            </Typography>
          </Section>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Section header="Address">
            <Typography variant="body1">
              {`${institute?.location?.streetAddr}, ${institute?.location?.geography?.city}, ${institute?.location?.geography?.state} - ${institute?.location?.geography?.pinCode}`}
            </Typography>
            <Typography variant="body1">
              {institute?.location?.geography?.region}
            </Typography>
          </Section>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainDashboard;
