import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import AboutMe from "./aboutMe";
import MyAccount from "./myAccount";
import ProfileCard from "./profileCard";
import UserInformation from "./userInformation";
//import RenderSnackbars from "../profileComponents/snackbar/snackbar";
import { fetchMemberById, userUpdate } from "../utils/axios";
//import { SnackbarContext } from "../profileComponents/snackbar/snackbar";
import { useSnackbar } from "notistack";
import { snackbarProps } from "../profileComponents/snackbar/snackbar";
import UserContext from "../../../context/UserContext";
import { useRouteMatch } from "react-router";
import { useToken } from "../../../services/useToken";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.5em",
    [theme.breakpoints.up("sm")]: {
      padding: "2em",
    },
  },
  button: { margin: theme.spacing(1), alignItems: "center" },
}));

// export const snackbarProps = (variant) => ({
//   variant: String(variant).toLowerCase(),
//   anchorOrigin: {
//     horizontal: "left",
//     vertical: "bottom",
//   },
//   transitionDuration: 5000,
// });

const MainProfile = ({ user, view }) => {
  // const { user, view } = props;
  //const setStateSnackbarContext = useContext(SnackbarContext);

  // const routeMatch = useRouteMatch();

  // const view = routeMatch.path;

  // const userCtx = useContext(UserContext);

  // const memberType1 = userCtx.user?.memberType;
  // console.log(memberType1);

  const [curUser, setCurUser] = useState(user);
  const { token } = useToken();

  // useEffect(() => {
  //   if (view !== "/myprofile") {
  //     const memberId = routeMatch.params.profileId;
  //     fetchMemberById(token, memberId)
  //       .then((res) => {
  //         console.log(res);
  //         setCurUser(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     setCurUser(userCtx.user);
  //   }
  // }, [userCtx.user, routeMatch.params.profileId, token]);

  //this state is to render or hide that verified icon in profileCard
  const [verified, setVerified] = useState(user);
  //this is to decide whether to render user profile by private view or public view
  const [userView, setUserView] = useState(view);

  const [fName, setFName] = useState(curUser.firstName);
  const [lName, setLName] = useState(curUser.lastName);
  const [email, setEmail] = useState(curUser.email);
  const [about, setAbout] = useState(curUser.about);
  const [fbProfile, setFbProfile] = useState(curUser.fbProfile);
  const [linkedinProfile, setLinkedinProfile] = useState(
    curUser.linkedinProfile
  );
  const [profilePicLink, setProfilePicLink] = useState(curUser.profilePicLink);
  const [memberType, setMemberType] = useState(curUser.memberType);
  //const [institute, setInstitute] = useState(curUser.institute);
  const [locality, setLocality] = useState(curUser.streetAddr);
  const [city, setCity] = useState(curUser.city);
  const [state, setState] = useState(curUser.state);
  const [country, setCountry] = useState("India");

  const { enqueueSnackbar } = useSnackbar();

  const [isEdit, setIsEdit] = useState(true);

  const emptyPrevData = {
    fname: "",
    lname: "",
    emailId: "",
    aboutUser: "",
    facebook: "",
    linkedIn: "",
    localityy: "",
    city: "",
    state: "",
    country: "",
  };
  const [previousData, setPreviousData] = useState(emptyPrevData);

  useEffect(() => {
    setCurUser(user);
    setVerified(user);
    setUserView(view);

    setFName(user.firstName);
    setLName(user.lastName);
    setEmail(user.email);
    setAbout(user.about);
    setFbProfile(user.fbProfile);
    setLinkedinProfile(user.linkedinProfile);
    setProfilePicLink(user.profilePicLink);
    setMemberType(user.memberType);
    setLocality(user.streetAddr);
    setCity(user.city);
    setState(user.state);

    setPreviousData(emptyPrevData);
    return () => {
      setCurUser();
      setVerified();
      setUserView();
      setFName();
      setLName();
      setEmail();
      setAbout();
      setFbProfile();
      setLinkedinProfile();
      setProfilePicLink();
      setMemberType();
      setLocality();
      setCity();
      setState();

      setPreviousData(emptyPrevData);
    };
  }, [user, view]);

  // const [fName, setFName] = useState(user.firstName);
  // const [lName, setLName] = useState(user.lastName);
  // const [email, setEmail] = useState(user.email);
  // const [about, setAbout] = useState(user.about);
  // const [fbProfile, setFbProfile] = useState(user.fbProfile);
  // const [linkedinProfile, setLinkedinProfile] = useState(user.linkedinProfile);
  // const [profilePicLink, setProfilePicLink] = useState(user.profilePicLink);
  // const [memberType, setMemberType] = useState(user.memberType);
  // //const [institute, setInstitute] = useState(user.institute);
  // const [locality, setLocality] = useState(user.streetAddr);
  // const [city, setCity] = useState(user.city);
  // const [state, setState] = useState(user.state);
  // const [country, setCountry] = useState("India");

  const editHandler = () => {
    setIsEdit(false);
    setPreviousData({
      fname: fName,
      lname: lName,
      emailId: email,
      aboutUser: about,
      facebook: fbProfile,
      linkedIn: linkedinProfile,
      localityy: locality,
      city: city,
      state: state,
      country: country,
    });
    // setStateSnackbarContext(true, "Edit Mode Enabled..!!", "warning");
    enqueueSnackbar("Edit Mode Enabled", snackbarProps("warning"));
  };

  const cancelHandler = () => {
    console.log("In Cancel Handler");
    setFName(previousData.fname);
    setLName(previousData.lname);
    setEmail(previousData.emailId);
    setAbout(previousData.aboutUser);
    setFbProfile(previousData.facebook);
    setLinkedinProfile(previousData.linkedIn);
    setCity(previousData.localityy);
    setState(previousData.state);
    setCountry(previousData.country);
    setIsEdit(true);
    enqueueSnackbar("Edit Cancelled !", snackbarProps("info"));
    //window.location.reload();
  };

  const submitHandler = () => {
    console.log("in submitHandler");
    if (email && fName && lName && city && state && country && locality) {
      setIsEdit(true);

      userUpdate(
        email,
        about,
        city,
        fbProfile,
        linkedinProfile,
        fName,
        lName,
        locality,
        state,
        profilePicLink,
        token
      )
        .then((res) => {
          console.log(res);
          enqueueSnackbar(
            "Changes has been saved successfully!",
            snackbarProps("success")
          );
        })
        .catch((error) => console.log(error));

      // setStateSnackbarContext(
      //   true,
      //   "Changes Has been recorded successfully..!!",
      //   "success"
      // );
    } else {
      enqueueSnackbar("Fields Cannot Be Empty!", snackbarProps("error"));
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <ProfileCard
            verified={verified}
            userView={userView}
            email={email}
            editHandler={editHandler}
            fName={fName}
            lName={lName}
            memberType={memberType}
            token={token}
            //institute={institute}
            profilePicLink={profilePicLink}
            setProfilePicLink={(pic) => setProfilePicLink(pic)}
            setFbProfile={setFbProfile}
            setLinkedinProfile={setLinkedinProfile}
          />
        </Grid>
        <Grid item xs={12}>
          <AboutMe
            isEdit={isEdit}
            about={about}
            setAbout={setAbout}
            fbProfile={fbProfile}
            setFbProfile={setFbProfile}
            setLinkedinProfile={setLinkedinProfile}
            linkedinProfile={linkedinProfile}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MyAccount
            isEdit={isEdit}
            email={email}
            setEmail={setEmail}
            fName={fName}
            lName={lName}
            setLName={setLName}
            setFName={setFName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <UserInformation
            isEdit={isEdit}
            locality={locality}
            setLocality={setLocality}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            country={country}
            setCountry={setCountry}
          />
        </Grid>
        <Grid item xs={12}>
          {!isEdit && (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={submitHandler}
                >
                  Save Changes
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={cancelHandler}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MainProfile;
