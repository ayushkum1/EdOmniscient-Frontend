import React from "react";

import {
  makeStyles,
  Card,
  CardContent,
  Grid,
  Paper,
  CardHeader,
  Divider,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import CardComp from "./CardComp";
import Statistics from "./Statistics";
import Filter from "./Filter";
import placementImg from "../img/placement.jpg";

import {
  getInstituteData,
  getLastNPlacementRecords,
} from "../services/placementService";
import { useRouteMatch } from "react-router";
import { useToken } from "../../../../services/useToken";
import { getCompaniesByInstitute } from "../../../dashboard/institutes/upload_helper/company.service";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: "relative",
  },
  card: {
    // border: "1px solid rgba(0,0,0,0.5)",
    borderRadius: "1em",
    padding: "1em",
    textAlign: "center",
    backgroundColor: "#eeeeee",
  },
  link: {
    fontFamily: "ARIAL",
    fontSize: "0.75rem",
    color: "black",
    fontWeight: "bold",
  },
  gridItem: {
    margin: "3em",
  },
  gridContainer: {
    width: "100%",
    alignItems: "baseline",
    textAlign: "center",
  },
  paper: {
    backgroundImage: `url(${placementImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    // backgroundAttachment: "fixed",
    height: theme.spacing(40),
    width: "100%",
    padding: "0",
    marginRight: "0",
    backgroundColor: "primary",
    display: "flex",
    alignContent: "flex-end",
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  dropdown: {
    width: "40%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function NewPlacement(props) {
  const classes = useStyles();
  const [currentRecord, setCurrentRecord] = useState({
    avgLPAOffered: 0,
    maxLPAOffered: 0,
    noPlacedStudents: 0,
  });

  const [about, setAbout] = useState("");
  const { token } = useToken();

  const [companyList, setCompanyList] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const routeMatch = useRouteMatch();

  useEffect(() => {
    const instituteId = routeMatch.params.profileId;
    retrieveLatestRecord(instituteId);
    retrieveInstituteData(instituteId);
    fetchCompanies(instituteId);
  }, [token, routeMatch.params.profileId]);

  const retrieveInstituteData = (instituteId) => {
    getInstituteData(token, instituteId).then((response) => {
      setAbout(response.data.aboutPlacements);
    });
  };

  //This method is called to initialize cards (Avg LPA Offered, Max LPA Offered and No. of Placed Students)
  //whenever application loads
  const retrieveLatestRecord = (instId) => {
    getLastNPlacementRecords(token, instId, 1) // here 1 is N : No. of batch to request
      .then((response) => {
        response.data.map((r) => {
          setCurrentRecord({
            avgLPAOffered: r.avgLPAOffered,
            maxLPAOffered: r.maxLPAOffered,
            noPlacedStudents: r.noPlacedStudents,
          });
          setFilterValues({
            batch: r.batch,
            courseName: r.courseName,
            year: r.year,
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchCompanies = (instituteId) => {
    getCompaniesByInstitute(token, instituteId)
      .then((resp) => setCompanyList(resp.data))
      .catch((err) => setCompanyList([]));
  };

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={4}
        style={{ padding: "1rem" }}
      >
        <Paper className={classes.paper} elevation={3} />

        <Grid item xs={11}>
          <Card className={classes.card} elevation={2} square>
            <CardHeader title="About Placement" />
            <Divider />
            {/* In this card we are printing the "About Placement" of an institute */}
            <CardContent>
              {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Dignissimos aspernatur veritatis porro numquam inventore
              exercitationem nihil enim quisquam minima. Quas exercitationem
              optio, quisquam placeat earum error nulla consequuntur possimus
              voluptas. Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Dignissimos aspernatur veritatis porro numquam inventore
              exercitationem nihil enim quisquam minima. Quas exercitationem
              optio, quisquam placeat earum error nulla consequuntur possimus
              voluptas. */}
              {about}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={11}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
            >
              {/* This is another component which will render a drop down to filter 
              records based on batch, year and course */}
              <Filter
                token={token}
                instituteId={routeMatch.params.profileId}
                setCurrentRecord={setCurrentRecord}
                setFilterValues={setFilterValues}
              />
            </Button>
          </div>
        </Grid>

        <Grid item xs={11}>
          <Paper
            style={{
              padding: "1em",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Current Record</Typography>
            <Typography variant="h6">{`${filterValues.batch} \u2022 ${filterValues.year} \u2022 ${filterValues.courseName}`}</Typography>
          </Paper>
        </Grid>

        <Container maxWidth="sm">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <CardComp
                content="Highest Package"
                value={currentRecord.maxLPAOffered}
                id="highestPackage"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CardComp
                content="Students Placed"
                value={currentRecord.noPlacedStudents}
                id="studentsPlaced"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardComp
                content="Average Package"
                value={currentRecord.avgLPAOffered}
                id="averagePackage"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {routeMatch && companyList.length > 0 && (
                <CardComp
                  companyList={companyList}
                  content="Our Recruiters"
                  value={companyList.length}
                  id="ourRecruiters"
                />
              )}
            </Grid>
          </Grid>
        </Container>

        <Grid item xs={12}>
          <Card className={classes.card} elevation={2} square>
            <CardContent>
              <div
                style={{
                  position: "relative",
                  height: "65vh",
                  maxWidth: "65vw",
                  margin: "auto",
                }}
              >
                {routeMatch.params.profileId && (
                  <Statistics
                    token={token}
                    instituteId={routeMatch.params.profileId}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default NewPlacement;
