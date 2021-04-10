import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { AutoRotatingCarousel } from "material-auto-rotating-carousel";
import Slide from "material-auto-rotating-carousel/lib/Slide";

function TestGrid(props) {
  const theme = props.theme;

  const styles = {
    mediaBG: {
      backgroundColor: theme.palette.secondary.main,
    },
    slideStyle: {
      backgroundColor: theme.palette.primary.main,
    },
  };

  const mobileBP = theme.breakpoints.down("sm");
  const isMobile = useMediaQuery(mobileBP);
  const isLandscape = useMediaQuery(`${mobileBP} and (orientation: landscape)`);

  const imgs = [
    "https://picsum.photos/id/1075/1600/900",
    "https://picsum.photos/id/1076/1600/900",
    "https://picsum.photos/id/1077/1600/900",
    "https://picsum.photos/id/1078/1600/900",
    "https://picsum.photos/id/1079/1600/900",
  ];

  const videos = [
    "https://www.youtube.com/embed/peKuX_8QKcE",
    "https://www.youtube.com/embed/4hs_GGss_Nc",
    "https://www.youtube.com/embed/hSj8619Zm7g",
    "https://www.youtube.com/embed/1Cir0J6jwBM",
  ];

  return (
    <div>
      <AutoRotatingCarousel
        mobile={isMobile}
        landscape={isLandscape}
        open={true}
        autoplay={false}
        style={{ position: "absolute" }}
      >
        {imgs.map((image) => (
          <Slide
            mediaBackgroundStyle={styles.mediaBG}
            style={styles.slideStyle}
            media={<img style={{ width: "100%" }} src={image} alt="aslkd" />}
            title="This is a very cool feature"
            subtitle="Just using this will blow your mind."
          />
        ))}
      </AutoRotatingCarousel>
    </div>
  );
}

export default TestGrid;
