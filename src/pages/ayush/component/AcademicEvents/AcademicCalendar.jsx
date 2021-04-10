import axios from "axios";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import CalendarEvent from "./CalendarEvent";
import moment from "moment";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.css";
import { useRouteMatch } from "react-router";
import { useToken } from "../../../../services/useToken";
import getAuthHeader from "../../../../services/getAuthHeader";
import { CalendarToday } from "@material-ui/icons";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyle = makeStyles((theme) => ({
  dividerStyle: {
    height: "80%",
    background: "black",
    marginTop: "50px",
    marginRight: "20px",
    // marginLeft: "40px", //wasnt looking in middle, so gave a margin of 30px
  },
  calendarDivStyle: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    maxHeight: "400px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "0px solid slategrey",
    },
  },
  calendarEventDisplayStyle: {
    marginTop: "30px",
    display: "flex",
  },
  calendarStyle: {
    minWidth: "90%",
    padding: "20px",
    height: "auto",
  },
  tabStyle: {
    marginTop: "30px",
  },
  allEventsStyle: {
    width: "100%",
    backgroundColor: "#f2f2f2",
  },
}));

export default function AcademicEvents(props) {
  const routeMatch = useRouteMatch();

  const { token } = useToken(); //custom hook by nilesh
  const [eventDate, seteventDate] = useState(new Date());
  const [events, setevents] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [tabValue, settabValue] = useState("allEvents");
  const [allEventsList, setallEventsList] = useState([]);
  const [listDate, setlistDate] = useState("");
  const [listClick, setlistClick] = useState(false);

  const batchSize = 1;
  const styles = useStyle();
  const instituteId = routeMatch.params.profileId;

  const handleChangeDate = (value) => {
    const isoVal = moment(Date.parse(value)).format();
    console.log("iso", value);
    seteventDate(value);
    setlistClick(false);
    getResponseData(isoVal.split("T")[0]);
  };

  const listItemClick = (value) => {
    const formattedDate = moment(Date.parse(value)).format("LL");

    console.log(formattedDate);
    setlistDate(formattedDate);
    setlistClick(true);
    getResponseData(value);
  };

  const getAllEventsResponse = () => {
    axios
      //institute id will be dynamic
      .get(`/api/institutes/${instituteId}/calendar`, {
        headers: getAuthHeader(token),
      })
      .then((mediaData) => {
        console.log("hi from axios get");
        console.log(mediaData.data);
        setallEventsList(mediaData.data);
      })
      .catch((error) => {
        console.log(error);
        const emptyArr = [];
        setallEventsList(emptyArr);
      });
  };

  const getResponseData = (date) => {
    console.log("event date ", eventDate.toDateString());
    axios
      .get(`/api/institutes/${instituteId}/calendar/${date}`, {
        headers: getAuthHeader(token),
      })
      .then((mediaData) => {
        console.log(mediaData.data);
        setevents(mediaData.data);
      })
      .catch((error) => {
        console.log(error);
        const emptyArr = [];
        setevents(emptyArr);
      });
  };

  const handlePageChange = (event, newPage) => {
    setcurrentPage(newPage);
  };

  const handleTabChange = (event, value) => {
    settabValue(value);
  };

  useEffect(() => {
    getAllEventsResponse();
    getResponseData(new Date().toISOString().split("T")[0]);
  }, [token, routeMatch.params.profileId]);

  return (
    <Grid container style={{ height: "auto" }}>
      <Grid item xs={12} md={7} lg={7} xl={7}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            className={styles.tabStyle}
          >
            <Tabs
              variant="fullWidth"
              onChange={handleTabChange}
              value={tabValue}
              style={{ background: "#f2f2f2" }}
            >
              <Tab label="All Events" value="allEvents" />
              <Tab label="Calendar" value="calendar" />
            </Tabs>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            className={styles.calendarDivStyle}
          >
            {tabValue === "calendar" && (
              <Calendar
                onChange={handleChangeDate}
                value={eventDate}
                className={styles.calendarStyle}
              />
            )}
            {tabValue === "allEvents" && (
              <>
                <List
                  className={styles.allEventsStyle}
                  style={{ width: "95%" }}
                >
                  {allEventsList.map((event, index) => (
                    <ListItem
                      key={index}
                      style={{ margin: "2px", lineHeight: "2px" }}
                      onClick={() => {
                        listItemClick(event.date);
                        setcurrentPage(0);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <CalendarToday />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>{event.name}</ListItemText>
                      <ChevronRightIcon />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        lg={5}
        className={styles.calendarEventDisplayStyle}
      >
        <Divider
          orientation="vertical"
          variant="middle"
          className={styles.dividerStyle}
        />
        {events.length > 0 ? (
          events
            .slice(currentPage * batchSize, currentPage * batchSize + batchSize)
            .map((item, index) => (
              <CalendarEvent
                listDate={listDate}
                listClick={listClick}
                name={item.name}
                date={item.date}
                description={item.description}
                image={item.imageUrl}
                selectedDate={eventDate}
                count={events.length}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                batchSize={batchSize}
              />
            ))
        ) : (
          <CalendarEvent
            description="No event on this date"
            image=""
            selectedDate={eventDate}
          />
        )}
      </Grid>
    </Grid>
  );
}
