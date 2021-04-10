import React, { useContext } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

/* 
  Expects college prop in the following json object:
  {
    "id": <number>,
    "name": <string>,
    "category": <string>,
    "location": <string>,
    "profileLink": <string>,
    "reviewCount": <number>,
    "review": [
      {
        "user": <string>,
        "content": <string>
      },
      ...
    ]
  }
 */

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    margin: theme.spacing(1),
  },
  cardActions: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  reviewBox: {
    overflow: "hidden",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function CollegeDetailsCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const college = props.college;
  const streetAddr = college.location.streetAddr;
  const city = college.location.geography.city;
  const state = college.location.geography.state;
  const pinCode = college.location.geography.pinCode;
  const courses = college.courses;

  const collegeRoute = `/institutes/${college.instituteId}`;

  const history = useHistory();

  const userCtx = useContext(UserContext);

  const handleCardClick = () => {
    history.push(collegeRoute);
  };

  const materialCard = () => {
    return (
      <>
        <Card className={classes.cardRoot}>
          <CardHeader
            title={college.name}
            subheader={`${streetAddr}, ${city}, ${state} - ${pinCode} \u2022 ${college.reviewCount} reviews`}
            onClick={handleCardClick}
          />
          <CardContent
            onClick={handleCardClick}
            style={{ padding: theme.spacing(1) }}
          >
            {/* <Typography
              // paragraph
              variant="body2"
              // noWrap
              className={`${classes.reviewBox}`}
            >{`${college.reviews[0].user}: ${college.reviews[0].content}`}</Typography> */}
            {/* <Typography
              component={Link}
              href={college.profileLink}
              variant="subtitle2"
            >
              Read more reviews
            </Typography> */}
            {courses.map((course) => {
              return (
                <Chip
                  key={course.id}
                  label={course.name}
                  color="primary"
                  style={{ margin: theme.spacing(0.5, 1) }}
                />
              );
            })}
          </CardContent>
          <Divider variant="middle" />
          <CardActions /* className={classes.cardActions} */>
            {/* <IconButton>
              <ShareIcon />
            </IconButton>
            <Button
              style={{ marginLeft: "auto" }}
              variant="outlined"
              color="primary"
              startIcon={<FavoriteIcon />}
            >
              Add to list
            </Button> */}
            <Button onClick={() => history.push(`${collegeRoute}/gallery`)}>
              Gallery
            </Button>
            {userCtx.user && (
              <>
                <Button
                  onClick={() => history.push(`${collegeRoute}/placements`)}
                >
                  Placements
                </Button>
                <Button onClick={() => history.push(`${collegeRoute}/reviews`)}>
                  Reviews
                </Button>
                <Button onClick={() => history.push(`${collegeRoute}/members`)}>
                  Members
                </Button>
                <Button
                  onClick={() => history.push(`${collegeRoute}/academics`)}
                >
                  Academics
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </>
    );
  };

  return materialCard();
}

export default CollegeDetailsCard;
