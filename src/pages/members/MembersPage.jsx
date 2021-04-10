import React, { useEffect, useState } from "react";
import { Avatar, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Pagination from "@material-ui/lab/Pagination";
import MemberCard from "./MemberCard";

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

const dummyData = [
  {
    id: 1,
    name: "Channappa Mirgale",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2016",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Faculty",
    rating: 3.5,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 2,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "active",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Alumni",
    rating: 3.5,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 3,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "active",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Faculty",
    rating: 3.9,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 4,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "active",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Faculty",
    rating: 4.1,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 5,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Alumni",
    rating: 4.3,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 6,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Alumni",
    rating: 4.5,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 7,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Faculty",
    rating: 4.3,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 8,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Faculty",
    rating: 1,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 9,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Alumni",
    rating: 2,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 10,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Alumni",
    rating: 4,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 11,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Alumni",
    rating: 4.3,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 12,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Alumni",
    rating: 4,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
  {
    id: 13,
    name: "Ayush Kumar Singh",
    qualifications: "EDAC",
    activeStatus: "last seen 5 min ago",
    passingYear: "2018",
    designation: "Software Engineer",
    currentOrg: "IBM India Pvt Ltd",
    accountType: "Alumni",
    rating: 3.5,
    about:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus est at eligendi impedit, unde nam, ex maiores error a id, exercitationem voluptatum eos voluptas maxime veniam. Architecto quod repellendus cumque.",
  },
];

const totalRecords = dummyData.length;
const pageSize = 10;

function StudentGrid() {
  const classes = useStyles();
  const history = useHistory();

  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const offset = page * pageSize - pageSize;
    const limit = Math.min(totalRecords - offset, pageSize);
    setRecords(dummyData.slice(offset, offset + limit));
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);

    // This vanilla JS code scrolls the view to top of the page.
    document
      .querySelector("#scroll-to-top-anchor")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="scroll-to-top-anchor" style={{ padding: "1em" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12} sm={12}>
              <Paper className={classes.paper}>test</Paper>
            </Grid>
          </Grid>
        </Grid>

        {records.map((i) => {
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
                  {/* <img
                    className={classes.photo}
                    src={"https://picsum.photos/seed/picsum/200/200"}
                  /> */}

                  <Avatar
                    src="https://picsum.photos/seed/picsum/200/200"
                    variant="rounded"
                    classes={{ rounded: classes.rounded }}
                    className={classes.photo}
                  />

                  <Typography
                    variant="overline"
                    onClick={() => history.push(`/profile/${i.id}`)}
                  >
                    {i.accountType}
                  </Typography>

                  <Typography variant="body2">{i.activeStatus}</Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={6} lg={6}>
                  <MemberCard
                    name={i.name}
                    avatar="https://picsum.photos/seed/picsum/80/80"
                    qualifications={i.qualifications}
                    passingYear={i.passingYear}
                    accountType={i.accountType}
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
