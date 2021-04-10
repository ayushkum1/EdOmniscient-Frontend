import React, { useState, useEffect } from "react";
import CountSection from "./CountSection";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useToken } from "../../../services/useToken";
import {
  getCourseCount,
  getInstituteCount,
  getMemberCount,
  getReviewCount,
  getUserCount,
} from "./getallcounts.service";
import Grid from "@material-ui/core/Grid";
import { Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: 0,
    width: "10em",
    height: "10em",
    backgroundColor: theme.palette.primary.main,
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: "5rem",
  },
}));

function RootMain(props) {
  const classes = useStyles();
  const { token } = useToken();

  const [users, setUsers] = useState(0);
  const [institutes, setInstitutes] = useState(0);
  const [courses, setCourses] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [members, setMembers] = useState(0);

  useEffect(() => {
    getUserCount(token)
      .then((resp) => setUsers(resp.data))
      .catch((err) => console.log(err));
    getInstituteCount(token)
      .then((resp) => setInstitutes(resp.data))
      .catch((err) => console.log(err));
    getCourseCount(token)
      .then((resp) => setCourses(resp.data))
      .catch((err) => console.log(err));
    getReviewCount(token)
      .then((resp) => setReviews(resp.data))
      .catch((err) => console.log(err));
    getMemberCount(token)
      .then((resp) => setMembers(resp.data))
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <CountSection header="TOTAL INSTITUTES">
            <Typography
              component="div"
              variant="h4"
              className={classes.avatarContainer}
            >
              <Avatar className={classes.avatar}>
                <span className={classes.number}>{institutes}</span>
              </Avatar>
            </Typography>
          </CountSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <CountSection header="TOTAL COURSES">
            <Typography
              component="div"
              variant="h4"
              className={classes.avatarContainer}
            >
              <Avatar className={classes.avatar}>
                <span className={classes.number}>{courses}</span>
              </Avatar>
            </Typography>
          </CountSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <CountSection header="TOTAL REVIEWS">
            <Typography
              component="div"
              variant="h4"
              className={classes.avatarContainer}
            >
              <Avatar className={classes.avatar}>
                <span className={classes.number}>{reviews}</span>
              </Avatar>
            </Typography>
          </CountSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <CountSection header="TOTAL MEMBERS">
            <Typography
              component="div"
              variant="h4"
              className={classes.avatarContainer}
            >
              <Avatar className={classes.avatar}>
                <span className={classes.number}>{members}</span>
              </Avatar>
            </Typography>
          </CountSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <CountSection header="TOTAL USERS">
            <Typography
              component="div"
              variant="h4"
              className={classes.avatarContainer}
            >
              <Avatar className={classes.avatar}>
                <span className={classes.number}>{users}</span>
              </Avatar>
            </Typography>
          </CountSection>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RootMain;
