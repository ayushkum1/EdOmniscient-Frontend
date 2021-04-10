import { Divider, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import Carousel from "./Carousel";
//import { getAllMediaByInstituteId } from "../../services/gallery.service";
import MediaByCategory from "./MediaByCategory";

import { getVideoThumbnail } from "../../components/utility/GalleryUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    /* "& > *": {
      margin: theme.spacing(1),
    }, */
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://picsum.photos/id/1073/1920/300?grayscale')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
  blogContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "#flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
}));

function Gallery(props) {
  // console.log(getEmbedUrl("https://www.youtube.com/watch?v=t7z3yBKQSPw"));

  const classes = useStyles();
  const [instId, setInstId] = useState(props.match.params.profileId);
  const [images, setImages] = useState();
  const [videos, setVideos] = useState();

  useEffect(() => {
    async function fetchData() {
      return axios.get(`/api/institutes/${instId}/media`);
    }
    fetchData()
      .then((resp) => {
        console.log(resp.data);
        const { categoryImageMap, categoryVideoMap } = MediaByCategory(
          resp.data,
          true
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
  }, []);

  const [open, setOpen] = React.useState(false);
  const [dialogProps, setDialogProps] = useState({
    cardId: null,
    urls: [],
    isVideo: false,
  });

  const handleClickOpen = (title, urls, isVideo) => {
    setDialogProps({ title: title, urls: urls, isVideo: isVideo });
    setOpen(true);
  };

  const handleClose = () => {
    setDialogProps({ title: "", urls: [], isVideo: false });
    setOpen(false);
  };

  // console.log(images.entries());

  return (
    <div className={classes.root}>
      <Carousel
        urls={dialogProps.urls}
        isVideo={dialogProps.isVideo}
        open={open}
        onClose={handleClose}
        theme={props.theme}
      />
      <Box className={classes.hero}>
        <Box> Photo Gallery </Box>
      </Box>
      <Container className={classes.blogContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Photos
        </Typography>
        <Grid container spacing={3}>
          {images !== undefined &&
            images.map((i, idx) => {
              return (
                <Grid item key={idx} xs={12} sm={6} md={4}>
                  <Card
                    onClick={() => handleClickOpen(i.category, i.urls, false)}
                    className={classes.card}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={i.urls[0].url}
                        title={i.category}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {i.category}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {/* {card.content} */}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}></CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <Divider style={{ marginTop: "1em" }} />

      <Container maxWidth="lg" className={classes.blogContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Videos
        </Typography>
        <Grid container spacing={3}>
          {videos !== undefined &&
            videos.map((v, idx) => {
              return (
                <Grid item key={idx} xs={12} sm={6} md={4}>
                  <Card
                    onClick={() => handleClickOpen(v.category, v.urls, true)}
                    className={classes.card}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={getVideoThumbnail(v.urls[0].url)}
                        title={v.category}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {v.category}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {/* {card.content} */}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}></CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
}

export default Gallery;
