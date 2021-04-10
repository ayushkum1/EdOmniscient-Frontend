import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Grid,
  Divider,
  Avatar,
  CardActionArea,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import Counter from "./Counter";
import { deepPurple } from "@material-ui/core/colors";
import Recruiter from "./Recruiters";
import { useToken } from "../../../../services/useToken";

const useStyles = makeStyles((theme) => ({
  media: {
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
  },

  card: {
    // border: "1px solid rgba(0,0,0,0.5)",
    borderRadius: "1em",
    padding: "1em",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(18),
    height: theme.spacing(18),
    display: "flex",
    fontSize: theme.spacing(4),
    // "& > *": {
    //   margin: theme.spacing(4),
    //
    // },
    // marginLeft: theme.spacing(17),
    // marginTop: theme.spacing(1),
  },
}));

const CardComp = (props) => {
  const { companyList } = props;
  const classes = useStyles();
  const childRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const componentName = props.id;

  const { token } = useToken();

  return (
    <Grid container direction="column" spacing={10}>
      <Grid item>
        <Card
          className={classes.card}
          elevation={3}
          square
          onClick={
            componentName == "ourRecruiters"
              ? () => childRef.current.handleClickOpen()
              : undefined
          }
        >
          <CardActionArea>
            <CardContent className={classes.media}>
              <Avatar className={classes.avatar}>
                <Counter value={props.value} />
              </Avatar>
              <Divider />
            </CardContent>

            <Divider />
            <CardContent>
              <Typography variant="h5">{props.content}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Recruiter companyList={companyList} ref={childRef} />
      </Grid>
    </Grid>
  );
};

export default CardComp;
