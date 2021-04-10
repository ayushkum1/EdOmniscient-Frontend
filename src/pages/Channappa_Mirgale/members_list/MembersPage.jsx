import React, { useEffect, useState } from "react";
import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Pagination from "@material-ui/lab/Pagination";
import MemberCard from "./MemberCard";
import { getApprovedMembers } from "../services/member-helper";
import { useToken } from "../../../services/useToken";
// import SearchBar from "../SearchBar";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "5em",
    textAlign: "center",
    fontSize: "24px",
    padding: theme.spacing(2),
    backgroundColor: grey[200],
  },

  photo: {
    [theme.breakpoints.down("sm")]: {
      width: "3em",
      height: "3em",
    },
    width: "6em",
    height: "6em",
    textAlign: "center",
  },

  rounded: {
    borderRadius: "0.5em",
  },
  divider: {
    margin: "1em",
  },
}));

function StudentGrid() {
  const classes = useStyles();
  const history = useHistory();
  const routeMatch = useRouteMatch();

  const { token } = useToken();

  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [member, setMember] = useState([]);

  const totalRecords = member.length;
  const pageSize = 10;
  useEffect(() => {
    retrieveMembers();
  }, [routeMatch.params.profileId]);

  const retrieveMembers = () => {
    const instId = routeMatch.params.profileId;
    getApprovedMembers(token, instId)
      .then((response) => {
        setMember(response.data);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log("member", member);

  useEffect(() => {
    const offset = page * pageSize - pageSize;
    const limit = Math.min(totalRecords - offset, pageSize);
    setRecords(member.slice(offset, offset + limit));
  }, [page, member]);

  const handlePageChange = (event, value) => {
    setPage(value);

    setTimeout(() => {
      // This vanilla JS code scrolls the view to top of the page.
      document
        .querySelector("#scroll-to-top-anchor")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div id="scroll-to-top-anchor" style={{ padding: "1em" }}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12} sm={12}>
              <Paper className={classes.paper}>test</Paper>
            </Grid>
          </Grid>
        </Grid> */}
        {/* <SearchBar/> */}
        {[...records].map((i) => {
          return (
            <Grid key={i.id} item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexFlow: "column",
                  }}
                >
                  <Avatar
                    // src="https://picsum.photos/seed/picsum/200/200"
                    src={undefined}
                    variant="rounded"
                    classes={{ rounded: classes.rounded }}
                    className={classes.photo}
                    onClick={() => history.push(`/users/${i.id}`)}
                  />

                  <Typography variant="body2">{i.activeStatus}</Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={6} lg={6}>
                  <MemberCard
                    id={i.id}
                    name={i.name}
                    avatar="https://picsum.photos/seed/picsum/80/80"
                    qualifications={i.qualifications}
                    passingYear={i.passingYear}
                    memberType={i.memberType}
                    year={i.year}
                    publicEmail={i.publicEmail}
                    publicPhone={i.publicPhone}
                    designation={i.designation}
                    currentOrg={i.currentOrg}
                    rating={i.rating}
                    about={i.about}
                  />

                  {/* <Paper className={classes.details}>
                    
                    <StudentCard
                      key={i.id}
                      name={i.name}
                      qualifications={i.qualifications}
                      activeStatus={i.activeStatus}
                      passingYear={i.passingYear}
                      currentOrg={i.currentOrg}
                      achievements={i.achievements}
                      rating={i.rating}
                    />
                    
                  </Paper> */}
                </Grid>
              </Grid>
              <Divider variant="middle" className={classes.divider} />
            </Grid>
          );
        })}
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={Math.floor(
              totalRecords / pageSize + (totalRecords % pageSize !== 0 ? 1 : 0)
            )}
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default StudentGrid;
