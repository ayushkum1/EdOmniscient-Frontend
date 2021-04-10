import React, { useContext, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import RateReviewIcon from "@material-ui/icons/RateReview";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {
  makeStyles,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useHistory, useRouteMatch } from "react-router-dom";
import TabView from "./TabView";
import {
  getInstituteById,
  getInstituteMediaThumbs,
} from "../../../services/institutes.service";
import UserContext from "../../../context/UserContext";
import BecomeMemberForm from "./BecomeMemberForm";
import { getCoursesOfInstitute } from "../../../services/courses.service";
import { useToken } from "../../../services/useToken";
import { SnackbarProvider, useSnackbar } from "notistack";
import WriteReviewForm from "./WriteReviewForm";
import { getReviewByUserEmail } from "../../Channappa_Mirgale/services/review-helper";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "6em",
    [theme.breakpoints.down("xs")]: {
      marginTop: "2em",
    },
  },
  container: {
    marginTop: "1em",
  },
  avatar: {
    width: "150px",
    height: "150px",
    border: "2.5px solid rgba(255,255,255)",
    marginBottom: "1em",
    position: "relative",
    top: "8em",

    [theme.breakpoints.down("xs")]: {
      width: "100px",
      height: "100px",
      top: "3em",
    },
  },
  paperCommon: {
    padding: "1em",
  },
  userActions: {
    display: "flex",
    position: "relative",
    bottom: "4em",
    justifyContent: "flex-end",
  },
}));

const snackbarProps = (variant) => ({
  variant: String(variant).toLowerCase(),
  anchorOrigin: {
    horizontal: "left",
    vertical: "bottom",
  },
  transitionDuration: 5000,
});

function InstituteProfile(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const mobileBP = useMediaQuery(theme.breakpoints.down("xs"));

  const [refresh, setRefresh] = useState(false);

  const { token } = useToken();
  const userCtx = useContext(UserContext);
  const [userReview, setUserReview] = useState({});

  const [institute, setInstitute] = useState({});
  const [thumbs, setThumbs] = useState([]);

  const [courseList, setCourseList] = useState([]);

  const [openMembershipDialog, setOpenMembershipDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const instId = routeMatch.params.profileId;
    getInstituteById(instId)
      .then((resp) => {
        console.log(resp.data);
        const inst = resp.data;
        const institute = {
          id: inst.instituteId,
          name: inst.name,
          nick: inst.nick,
          about: inst.about,
          profilePicUrl: inst.profilePicUrl,
          coverPicUrl: inst.coverPicUrl,
          aboutPlacements: inst.aboutPlacements,
          streetAddr: inst.location.streetAddr,
          city: inst.location.geography.city,
          state: inst.location.geography.state,
          pinCode: inst.location.geography.pinCode,
          region: inst.location.geography.region,
        };

        setInstitute(institute);
      })
      .catch((err) => {
        console.log(err.response);
      });

    getInstituteMediaThumbs(instId)
      .then((resp) => {
        setThumbs(resp.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    getCoursesOfInstitute(instId)
      .then((resp) => {
        setCourseList(resp.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    return () => {
      setInstitute({});
      setThumbs([]);
      setCourseList([]);
    };
  }, [routeMatch.params.profileId]);

  useEffect(() => {
    const instId = routeMatch.params.profileId;
    if (checkReviewPerms()) {
      getReviewByUserEmail(token, instId, userCtx.user.email)
        .then((resp) => {
          console.log(resp.data);
          setUserReview(resp.data);
        })
        .catch((err) => {
          console.log(err.response);
          setUserReview({});
        });
    }
    return () => {
      setUserReview({});
    };
  }, [routeMatch.params.profileId, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleBecomeMember = () => {
    if (userCtx.user) {
      setOpenMembershipDialog(true);
    } else {
      enqueueSnackbar(
        "Please sign up / sign in before applying for membership",
        snackbarProps("info")
      );
    }
  };

  const handleWriteReview = () => {
    if (userCtx.user && userCtx.user.status === "APPROVED") {
      setOpenReviewDialog(true);
    } else {
      enqueueSnackbar(
        "Membership approval is pending.",
        snackbarProps("warning")
      );
    }
  };

  const coverPhotoStyles = {
    backgroundImage: `url(${
      institute.coverPicUrl ? institute.coverPicUrl : ""
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: mobileBP ? "100px" : "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const checkReviewPerms = () => {
    return (
      userCtx.user !== null &&
      userCtx.user.memberType !== null &&
      userCtx.user.instituteId === Number(props.match.params.profileId)
    );
  };

  return (
    <div>
      <SnackbarProvider>
        <Box style={coverPhotoStyles}>
          <Avatar className={classes.avatar} src={institute.profilePicUrl} />
        </Box>

        {checkReviewPerms() ? (
          <Container className={classes.userActions} maxWidth={false}>
            <Tooltip title="Review" placement="top-start">
              <Button
                onClick={handleWriteReview}
                startIcon={!mobileBP ? <RateReviewIcon /> : null}
                variant="contained"
                color="secondary"
              >
                {mobileBP ? <RateReviewIcon /> : "Write a review"}
              </Button>
            </Tooltip>
          </Container>
        ) : null}

        {(userCtx.user === null || userCtx.user.memberType === null) &&
        userCtx.user?.role !== "ROLE_INSTITUTE_ADMIN" &&
        userCtx.user?.role !== "ROLE_ROOT" ? (
          <Container className={classes.userActions} maxWidth={false}>
            <Tooltip title="Membership" placement="top-start">
              <Button
                onClick={handleBecomeMember}
                startIcon={!mobileBP ? <PersonAddIcon /> : null}
                variant="contained"
                color="secondary"
              >
                {mobileBP ? <PersonAddIcon /> : "Become a member"}
              </Button>
            </Tooltip>
          </Container>
        ) : null}

        <Container className={classes.title} disableGutters>
          <Typography variant="h5">{`${institute.name}, (${institute.city})`}</Typography>
          <Typography variant="overline">{institute.nick}</Typography>
        </Container>
        <Container className={classes.container}>
          <Paper elevation={0} className={classes.paperCommon}>
            <Typography variant="h6">{`About ${institute.name}, (${institute.city})`}</Typography>
            <Typography variant="body2">{institute.about}</Typography>
          </Paper>
        </Container>

        {/* <Container className={classes.container}>
        <Paper elevation={0} className={classes.paperCommon}>
          <Typography variant="h6">Courses offered</Typography>
          <Grid container spacing={1}>
            {courses.map((course, idx) => (
              <Grid item key={idx}>
                <Button variant="contained" disableElevation>
                  {course}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container> */}

        <Container className={classes.container}>
          <Paper elevation={0} className={classes.paperCommon}>
            <Typography variant="h6">Gallery</Typography>
            {thumbs.length > 0 ? (
              <>
                <Grid container spacing={1}>
                  {thumbs.map((url, idx) => (
                    <Grid item key={idx}>
                      <img
                        src={url}
                        alt="thumbs"
                        style={{ width: "100px", height: "80px" }}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Button
                  onClick={() =>
                    history.push(`/institutes/${institute.id}/gallery`)
                  }
                >
                  Show more
                </Button>{" "}
              </>
            ) : (
              <Typography variant="body1">
                No photo or videos to show
              </Typography>
            )}
          </Paper>
        </Container>

        <Container className={classes.container}>
          <Paper elevation={0} className={classes.paperCommon}>
            <TabView user={userCtx.user} token={token} {...props} />
          </Paper>
        </Container>

        {userCtx.user ? (
          <BecomeMemberForm
            open={openMembershipDialog}
            onClose={() => setOpenMembershipDialog(false)}
            instituteId={institute.id}
            courseList={courseList}
            token={token}
            user={userCtx.user}
            snackbarProps={snackbarProps}
          />
        ) : null}

        {checkReviewPerms() ? (
          <WriteReviewForm
            open={openReviewDialog}
            onClose={() => setOpenReviewDialog(false)}
            instituteId={institute.id}
            token={token}
            user={userCtx.user}
            userReview={userReview}
            snackbarProps={snackbarProps}
            refresh={handleRefresh}
          />
        ) : null}
      </SnackbarProvider>
    </div>
  );
}

export default InstituteProfile;
