import React, { useState, useRef } from "react";
import {
  Avatar,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import RenderCropper from "./../cropper/profileChanger";
//import { SnackbarContext } from "../snackbar/snackbar";
import { removeProfilePicture } from "../../utils/axios";
import { useSnackbar } from "notistack";
import { snackbarProps } from "../snackbar/snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },

  avatarContainer: {
    width: "20vh",
    height: "20vh",

    [theme.breakpoints.down("sm")]: {
      width: "15vh",
      height: "15vh",
    },
    // "&:hover": {
    //   transition: "all 0.7s ease 1s",
    //   width: "20%",
    //   height: "20%",
    //   trasnform: "scale(1.25)",
    // },
    // position: "relative",
    // top: "50%",
    // left: "16%",
    // transform: "translate(-50%,-50%)",
  },

  avatar: {
    width: "100%",
    height: "100%",

    // backgroundColor: "#f5f5f5",
    // overflow: "hidden",
    // position: "relative",
    // alignSelf: "center",
  },

  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "3px solid #f5f5f1",
  },

  cameraIcon: {
    // height: "4rem",
    // width: "4rem",
    // position: "absolute",
    // bottom: "0",
    // right: "100px",
    // backgroundColor: "white",

    position: "relative",
    top: "-2.5rem",
    left: "4rem",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "white",
    },
  },
}));

const RenderAvatar = ({
  profilePicLink,
  setProfilePicLink,
  email,
  userView,
  token,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [showCropper, setShowCropper] = useState(false);
  //const setStateSnackbarContext = useContext(SnackbarContext);

  const handleCropper = () => {
    setShowCropper((prevValue) => !prevValue);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  // const defaultProfilePic =
  //   "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg";
  const defaultProfilePic = "";

  const removeProfilePic = () => {
    profilePicLink === defaultProfilePic
      ? // ? setStateSnackbarContext(
        //     true,
        //     "Please set a profile picture first",
        //     "warning"
        //   )
        enqueueSnackbar(
          "Please set a profile picture first",
          snackbarProps("warning")
        )
      : removeProfilePicture(email, defaultProfilePic, token)
          .then((res) => {
            console.log(res);
            setProfilePicLink(defaultProfilePic);
            enqueueSnackbar(
              "Removed Profile Picture",
              snackbarProps("warning")
            );
            // setStateSnackbarContext(
            //   true,
            //   "Removed Profile Picture",
            //   "warning"
            // );
          })
          .catch((err) => console.log(err));
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [finalDp, setFinalDp] = useState(null);

  return (
    <>
      <div className={classes.avatarContainer}>
        <Avatar className={classes.avatar} src={profilePicLink} alt="" />
        {/* <div className={classes.avatar}>
          <img
            src={profilePicLink !== null ? profilePicLink : defaultProfilePic}
            alt="avatar"
            className={classes.avatarImg}
          />
        </div> */}
        {userView === "/myprofile" && (
          <IconButton
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            size="small"
            className={classes.cameraIcon}
          >
            <CameraAltIcon fontSize="default" />
          </IconButton>
        )}

        {/*the code below is for that camera icon on avatar and is taken from mui docs */}
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={(event) => {
                        handleCropper();
                        handleClose(event);
                      }}
                    >
                      Change
                    </MenuItem>

                    <MenuItem
                      onClick={(e) => {
                        removeProfilePic();
                        handleClose(e);
                      }}
                    >
                      Remove
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      {showCropper && (
        <Dialog
          fullWidth
          maxWidth="xl"
          open={showCropper}
          onClose={() => setShowCropper(false)}
        >
          <DialogContent>
            <RenderCropper
              handleCropper={handleCropper}
              finalDp={finalDp}
              setFinalDp={(finalDp) => setFinalDp(finalDp)}
              setProfilePicLink={setProfilePicLink}
              email={email}
              token={token}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RenderAvatar;
