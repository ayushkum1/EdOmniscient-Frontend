import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.primary,
  },
}));

const Recruiters = forwardRef((props, ref) => {
  const { companyList } = props;

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setIsOpen(true);
    },
  }));
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog maxWidth="md" onClose={handleClose} open={isOpen}>
      <div style={{ display: "flex" }}>
        <DialogTitle onClose={handleClose}>
          <Typography component="div" variant="h6">
            Our Recruiters List
          </Typography>
          <IconButton
            aria-label="close"
            color="primary"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </div>
      <DialogContent dividers style={{ textAlign: "center" }}>
        {companyList?.map((c) => (
          <img
            key={c.id}
            src={c.logoUrl}
            style={{
              height: "100px",
              width: "150px",
              margin: "5px 5px 5px 5px",
              border: "5px solid #555",
              objectFit: "contain",
            }}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
});

// function Recruiters(props) {
//   const { children, isOpen, setIsOpen } = props;
//   const classes = useStyles();

//   const handleClickOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <Dialog open={isOpen} maxWidth="md" onClose={() => setIsOpen(false)}>
//       <div style={{ display: "flex" }}>
//         <DialogTitle onClose={() => setIsOpen(false)}>
//           <Typography variant="h6">Our Recruiters List</Typography>

//           <IconButton
//             aria-label="close"
//             color="primary"
//             className={classes.closeButton}
//             // onClick={() => setIsOpen(false)}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//       </div>
//       <DialogContent dividers>{children}</DialogContent>
//     </Dialog>
//   );
// }

export default Recruiters;
