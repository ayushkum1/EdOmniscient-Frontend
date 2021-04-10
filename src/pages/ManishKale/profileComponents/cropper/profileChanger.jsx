import React, { useState, useRef } from "react";
import {
  Button,
  IconButton,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import CancelIcon from "@material-ui/icons/Cancel";
//import { SnackbarContext } from "../snackbar/snackbar";
import ImageIcon from "@material-ui/icons/Image";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { dataURLtoFile } from "./../../utils/dataURLtoFile";
import getCroppedImg from "../../utils/cropImage";
import ProfilePictureUploader from "../../utils/ProfilePictureUploader";
import { snackbarProps } from "./../snackbar/snackbar";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "50px",
    backgroundColor: "rgba(0,0,0,0.5)",
    maxWidth: "50%",
    minHeight: "50vh",
  },

  containerCropper: {
    display: "flex",
    justifyContent: "center",
    height: "90%",
  },

  cropper: {
    height: "90%",
  },

  containerButtons: {
    border: "1px solid #f5f5f5",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  buttons: { marginRight: "10px" },

  iconButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
  },

  cancelIcon: {
    position: "absolute",
    color: "#00a3c8",
    fontSize: "30px",
    "&:hover": {
      color: "red",
    },
  },
}));

const RenderCropper = ({ handleCropper, email, setProfilePicLink, token }) => {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const inputRef = useRef();

  const triggerFileSelectPopup = () => {
    inputRef.current.click();
  };

  // const setStateSnackbarContext = useContext(SnackbarContext);

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  //const [file, setfile] = useState();

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    // console.log(croppedAreaPercentage, croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  };

  //const image will contain link of imageBase64 format
  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      //setfile(event.target.file);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        //console.log(reader.result);
        setImage(reader.result);
      });
    }
  };

  //setStateSnackbarContext(true, "please select an image", "warning");
  const onClear = () => {
    if (!image)
      return enqueueSnackbar(
        "please select an image",
        snackbarProps("warning")
      );
    setImage(null);
    setCroppedArea(null);
  };

  // const getRadianAngle = (degreeValue) => {
  //   return (degreeValue * Math.PI) / 180;
  // };

  // const getCroppedImg = (imageSrc, pixelCrop, rotation = 0) => {
  //   const image = new Image();
  //   image.src = imageSrc;

  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");

  //   const maxSize = Math.max(image.width, image.height);
  //   const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  //   canvas.width = safeArea;
  //   canvas.height = safeArea;

  //   ctx.translate(safeArea / 2, safeArea / 2);
  //   ctx.rotate(getRadianAngle(rotation));
  //   ctx.translate(-safeArea / 2, -safeArea / 2);

  //   ctx.drawImage(
  //     image,
  //     safeArea / 2 - image.width * 0.5,
  //     safeArea / 2 - image.height * 0.5
  //   );

  //   const data = ctx.getImageData(0, 0, safeArea, safeArea);

  //   canvas.width = pixelCrop.width;
  //   canvas.height = pixelCrop.height;

  //   ctx.putImageData(
  //     data,
  //     0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
  //     0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  //   );

  //   const convertedImage = canvas.toDataURL("image/jpeg");
  //   setProfilePicLink(convertedImage);
  //   console.log("Cropped Image Encoded in base64: ", convertedImage);

  //   setStateSnackbarContext(
  //     true,
  //     "Profile Picture has been changed successfully..!!",
  //     "success"
  //   );
  // };

  const onUpload = async () => {
    //image contains dataurl of original photo (i.e.fileReader.result)
    //cropped area will be having pixel cordinates of 1:1 resolution of cropper
    const canvas = await getCroppedImg(image, croppedArea);
    // console.log(canvas);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const imageFile = dataURLtoFile(canvasDataUrl, "ProfilePic.jpeg");
    console.log(imageFile);
    ProfilePictureUploader(email, imageFile, setProfilePicLink, token);
    enqueueSnackbar(
      "Success! Please wait till changes reflect.",
      snackbarProps("success")
    );
    // setStateSnackbarContext(
    //   true,
    //   "Success..!! Please wait till changes reflect.",
    //   "success"
    // );
  };

  const imageCropper = (
    <div>
      <Container className={classes.container}>
        <div>
          <IconButton className={classes.iconButton} onClick={handleCropper}>
            <CancelIcon className={classes.cancelIcon} />
          </IconButton>
        </div>
        {image && (
          <>
            <div>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                className={classes.cropper}
              />
            </div>
          </>
        )}
      </Container>

      <Grid container justify="center">
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Slider
            color="secondary"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e, zoom) => setZoom(zoom)}
            style={{ width: "60%" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Container maxWidth="sm">
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={onSelectFile}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={triggerFileSelectPopup}
              className={classes.buttons}
            >
              Choose
              <ImageIcon fontSize="small" style={{ marginLeft: "10px" }} />
            </Button>

            {croppedArea != null ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.buttons}
                onClick={() => {
                  //getCroppedImg(image, croppedArea);
                  onUpload();
                  handleCropper();
                }}
              >
                Upload
                <CloudUploadIcon
                  fontSize="small"
                  style={{ marginLeft: "10px" }}
                />
              </Button>
            ) : null}
          </Container>

          <Button
            onClick={() => onClear()}
            variant="contained"
            color="primary"
            className={classes.buttons}
          >
            Clear
            <BackspaceIcon fontSize="small" style={{ marginLeft: "10px" }} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return imageCropper;
};

export default RenderCropper;

/* const manishImageCropper = (
    <div className={classes.container}>
      <IconButton className={classes.iconButton} onClick={handleCropper}>
        <CancelIcon className={classes.cancelIcon} />
      </IconButton>
      <div className={classes.containerCropper}>
        {image ? (
          <>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              className={classes.cropper}
            />
            <Slider
              className={classes.slider}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </>
        ) : null}
      </div>
      <div className={classes.containerButtons}>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={onSelectFile}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={triggerFileSelectPopup}
          className={classes.buttons}
        >
          Choose
          <ImageIcon fontSize="small" style={{ marginLeft: "10px" }} />
        </Button>

        <Button
          onClick={() => onClear()}
          variant="contained"
          color="primary"
          className={classes.buttons}
        >
          Clear
          <BackspaceIcon fontSize="small" style={{ marginLeft: "10px" }} />
        </Button>

        {croppedArea != null ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={() => {
              getCroppedImg(image, croppedArea);
              handleCropper();
            }}
          >
            Upload
            <CloudUploadIcon fontSize="small" style={{ marginLeft: "10px" }} />
          </Button>
        ) : null}
      </div>
    </div>
  ); */
