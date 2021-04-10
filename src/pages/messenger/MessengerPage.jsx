import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import avatar from "../../assets/5853.jpg";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    padding: "5em 2em",
  },
  sideBarSection: {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0.5),
  },
}));

function MessengerPage(props) {
  const userContext = useContext(UserContext);
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <Paper square elevation={0}>
            <Container className={classes.sideBarSection}>
              <Avatar style={{ marginLeft: "0.5em" }} src={avatar}>
                A
              </Avatar>
              <Box>
                <IconButton>
                  <ChatIcon />
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Container>
            <Divider variant="fullWidth" />
            <Container className={classes.sideBarSection}>
              <TextField
                size="small"
                style={{ margin: "0 0em" }}
                fullWidth
                placeholder="Search"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <SearchIcon
                      style={{ marginRight: "1em", opacity: "50%" }}
                    />
                  ),
                }}
              />
            </Container>
            <Divider variant="fullWidth" />
            <Container className={classes.sideBarSection}></Container>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.sideBarSection} square elevation={0}>
            asdf
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MessengerPage;
