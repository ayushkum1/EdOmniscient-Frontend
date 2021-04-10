import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhotoIcon from "@material-ui/icons/Photo";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { Button, useMediaQuery, useTheme } from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { fetchData, deleteMedia } from "../../../services/gallery.service";
import MediaByCategory from "../../gallery/MediaByCategory";
import Checkbox from "@material-ui/core/Checkbox";
import { useSnackbar } from "notistack";
import Container from "@material-ui/core/Container";
import { handleDeleteFirebase } from "./upload_helper/upload.service";
import AddVideoForm from "./AddVideoForm";
import AyushAddImageForm from "./AyushAddImageForm";
import { useToken } from "../../../services/useToken";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root1: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  imageStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    // height: "500px",
  },
  icon: {
    color: "white",
  },
  paper: {
    margin: "30px",
    padding: "50px",
    width: "auto",
    height: "auto",
  },
  image: {
    width: "500px",
    height: "200px",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  title: {
    lineHeight: "2",
    fontWeight: "450",
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

//Video part

function ManageGallery(props) {
  const { curInstitute } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [refresh, setRefresh] = useState(false);

  const [checked, setChecked] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { token } = useToken();
  const mobileBP = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    fetchData(curInstitute)
      .then((resp) => {
        console.log(resp.data);
        const { categoryImageMap, categoryVideoMap } = MediaByCategory(
          resp.data
        );

        // console.log(categoryImageMap);
        setImages([
          ...Array.from(categoryImageMap, ([category, urls]) => ({
            category,
            urls,
          })),
        ]);
        // console.log(categoryVideoMap);
        setVideos([
          ...Array.from(categoryVideoMap, ([category, urls]) => ({
            category,
            urls,
          })),
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [props, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCheckChange = (event, id) => {
    if (event.target.checked) setChecked([...checked, id]);
    else setChecked(checked.filter((x) => x !== id));
  };

  const handleDeleteMedia = (mediaId) => {
    // Here, too, we send instituteId from routeMatch.params.instituteId

    checked.forEach((item) => {
      deleteMedia(token, curInstitute, item)
        .then((resp) => {
          console.log(resp.data);
          const deletedMedia = resp.data;
          handleDeleteFirebase(
            curInstitute,
            deletedMedia.category,
            deletedMedia.name
          );
          setChecked([]);
          enqueueSnackbar("Media deleted successfully", {
            variant: "success",
            horizontal: "left",
            vertical: "bottom",
            transitionDuration: 5000,
          });
          setRefresh(!refresh);
        })
        .catch((err) => {
          console.log(err.response);
          enqueueSnackbar("Could not delete media", {
            variant: "error",
            horizontal: "left",
            vertical: "bottom",
            transitionDuration: 5000,
          });
        });
    });
  };

  const handleDeleteVideo = (mediaId) => {
    // Here, too, we send instituteId from routeMatch.params.instituteId

    deleteMedia(token, curInstitute, mediaId)
      .then((resp) => {
        console.log(resp.data);
        enqueueSnackbar("Media deleted successfully", {
          variant: "success",
          horizontal: "left",
          vertical: "bottom",
          transitionDuration: 5000,
        });
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err.response);
        enqueueSnackbar("Could not delete media", {
          variant: "error",
          horizontal: "left",
          vertical: "bottom",
          transitionDuration: 5000,
        });
      });
  };

  return (
    <div>
      <div className={classes.root}>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Images" icon={<PhotoIcon />} {...a11yProps(0)} />
            <Tab label="Videos" icon={<VideoLibraryIcon />} {...a11yProps(1)} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <div className={classes.root}>
            <Container
              disableGutters
              maxWidth="xl"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Button
                  onClick={() => setRefresh(!refresh)}
                  variant="outlined"
                  color="default"
                  className={classes.button}
                  startIcon={<AutorenewIcon />}
                >
                  Refresh
                </Button>
                <Button
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddIcon />}
                >
                  Add New Media
                </Button>
              </div>

              <Button
                onClick={handleDeleteMedia}
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Container>
            {images.map((record, idx) => (
              <React.Fragment key={idx}>
                <Typography key={idx} variant="h4" className={classes.title}>
                  {record.category}
                </Typography>
                <GridList
                  cellHeight={160}
                  className={classes.gridList}
                  cols={mobileBP ? 1 : 3}
                >
                  {record.urls.map((image, idx) => (
                    <GridListTile
                      key={image.id}
                      // cols={image.featured ? 2 : 1}
                      // rows={image.featured ? 2 : 1}
                    >
                      <img src={image.url} alt={image.id} />
                      <GridListTileBar
                        titlePosition="top"
                        actionIcon={
                          <Checkbox
                            checked={checked.includes(image.id)}
                            onChange={(e) => handleCheckChange(e, image.id)}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        }
                        actionPosition="right"
                        className={classes.titleBar}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </React.Fragment>
            ))}
          </div>
        </TabPanel>
      </div>
      <div className={classes.root}>
        <TabPanel value={value} index={1}>
          <div>
            <Tooltip title="Add" aria-label="add">
              <Fab
                onClick={() => setVideoDialogOpen(true)}
                color="secondary"
                className={classes.absolute}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>URLS</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {videos.length === 0 ? (
                    <TableRow align="center">
                      {/* <TableCell></TableCell> */}
                      <TableCell colSpan="6">{videos.length}</TableCell>
                    </TableRow>
                  ) : (
                    videos.map((video, idx) =>
                      video.urls.map((u) => {
                        return (
                          <TableRow key={u.id}>
                            <TableCell>{video.category}</TableCell>
                            <TableCell>{u.url}</TableCell>

                            <TableCell>
                              <Button onClick={() => handleDeleteVideo(u.id)}>
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </TabPanel>
      </div>

      <AyushAddImageForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        instituteId={curInstitute}
        refresh={handleRefresh}
        token={token}
      />

      {/* <AddImageForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        instituteId={curInstitute}
        refresh={refresh}
        setRefresh={setRefresh}
      /> */}
      <AddVideoForm
        open={videoDialogOpen}
        onClose={() => setVideoDialogOpen(false)}
        instituteId={curInstitute}
        refresh={refresh}
        setRefresh={setRefresh}
        token={token}
      />
    </div>
  );
}

export default ManageGallery;
