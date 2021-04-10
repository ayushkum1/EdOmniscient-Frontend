import React, { useEffect, useRef, useState } from "react";
import Container from "@material-ui/core/Container";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core";
import CoursesList from "../../ayush/component/Courses/CoursesList";
import NewPlacement from "../../Kanchan Harjani/PlacementPage/components/NewPlacement";
import ReviewGrid from "../../Channappa_Mirgale/reviewList/ReviewPage";
import StudentGrid from "../../Channappa_Mirgale/members_list/MembersPage";
import AcademicEvents from "../../ayush/component/AcademicEvents/AcademicCalendar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container style={{ marginTop: "1em" }}>{children}</Container>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    overflow: "hidden",
  },
}));

function TabView(props) {
  const { user } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props?.location?.pathname?.includes("placements")) {
      setValue(1);
      scrollView();
    }
    if (props?.location?.pathname?.includes("reviews")) {
      setValue(2);
      scrollView();
    }
    if (props?.location?.pathname?.includes("members")) {
      setValue(3);
      scrollView();
    }
    if (props?.location?.pathname?.includes("academics")) {
      setValue(4);
      scrollView();
    }

    return () => setValue(0);
  }, []);

  const scrollView = () => {
    setTimeout(() => {
      window.document.querySelector("#tabs-appbar").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  const priviledgedTabs = [
    <Tab key={1} label="Placements" />,
    <Tab key={2} label="Reviews" />,
    <Tab key={3} label="Members" />,
    <Tab key={4} label="Academic Calendar" />,
  ];

  const priviledgedPanels = [
    <TabPanel key={1} value={value} index={1} className={classes.tabPanel}>
      {/* Call your component here */}
      {/* <Typography variant="body1">Placements component goes here</Typography> */}
      <NewPlacement {...props} />
    </TabPanel>,
    <TabPanel key={2} value={value} index={2} className={classes.tabPanel}>
      {/* Call your component here */}
      {/* <Typography variant="body1">Reviews component goes here</Typography> */}
      <ReviewGrid {...props} />
    </TabPanel>,
    <TabPanel key={3} value={value} index={3} className={classes.tabPanel}>
      {/* Call your component here */}
      {/* <Typography variant="body1">Members component goes here</Typography> */}
      <StudentGrid {...props} />
    </TabPanel>,
    <TabPanel key={4} value={value} index={4} className={classes.tabPanel}>
      {/* Call your component here */}
      {/* <Typography variant="body1">
          Academic Calendar component goes here
        </Typography> */}
      <AcademicEvents {...props} />
    </TabPanel>,
  ];

  return (
    <>
      <AppBar position="static" id="tabs-appbar">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="simple tabs example"
        >
          <Tab label="Courses" />
          {user && priviledgedTabs}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        {/* Call your component here */}
        {/* <Typography variant="body1">Courses component goes here</Typography> */}
        <CoursesList />
      </TabPanel>
      {user && priviledgedPanels}
    </>
  );
}

export default TabView;
