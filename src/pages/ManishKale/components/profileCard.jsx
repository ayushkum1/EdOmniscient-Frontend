import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import Grid from "@material-ui/core/Grid";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
//import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button/Button";
import EditIcon from "@material-ui/icons/Edit";
import RenderAvatar from "../profileComponents/avatar/avatar";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "8em",
    height: "8em",
    display: "flex",
    justifyContent: "center",
  },

  mypaper: {
    border: "1px solid rgba(0,0,0,0.3)",
    padding: "1em",
    textAlign: "center",
    backgroundColor: "#e3f2e1",
  },

  item: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },

  button: {
    margin: theme.spacing(1),
  },
}));

const ProfileCard = ({
  verified,
  userView,
  editHandler,
  fName,
  lName,
  memberType,
  email,
  profilePicLink,
  setProfilePicLink,
  token,
}) => {
  //status is hardcoded here
  //in actual status = user_id.isActive()

  const classes = useStyles();

  //<RenderAvatar />

  return (
    <Paper elevation={8} className={classes.mypaper}>
      <Grid container direction="column" spacing={3} justify="center">
        <Grid item className={classes.item}>
          <RenderAvatar
            userView={userView}
            profilePicLink={profilePicLink}
            setProfilePicLink={setProfilePicLink}
            email={email}
            token={token}
          />
        </Grid>
        <Grid item className={classes.item}>
          <Typography variant="h3" align="center">
            {fName} {lName}
          </Typography>
          {verified?.memberType && (
            <VerifiedUserIcon fontSize="small" color="primary" />
          )}
        </Grid>

        <Grid item className={classes.item}>
          <Typography align="center" variant="h6">
            {memberType}
          </Typography>
        </Grid>

        {/* <Grid item className={classes.item}>
          <Typography align="center" variant="h6">
            CDAC ACTS
          </Typography>
        </Grid> */}

        <Grid item className={classes.item}>
          {
            userView === "/myprofile" ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<EditIcon>Edit</EditIcon>}
                onClick={editHandler}
              >
                Edit Profile
              </Button>
            ) : null
            // <Button
            //   variant="contained"
            //   color="primary"
            //   className={classes.button}
            //   endIcon={<SendIcon>send</SendIcon>}
            // >
            //   Message
            // </Button>
          }
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileCard;

/*
<Avatar
            alt="User Icon"
            src="https://www.nicepng.com/png/full/128-1280593_computer-user-icon-img-users.png"
            className={classes.avatar}
            variant="circular"
          />
 */
