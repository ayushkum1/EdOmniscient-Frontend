import React, { useState } from "react";

import { Grid, Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import InstituteVideos from "./InstituteVideos";
import GDPI from "./GDPI";
import InstituteFest from "./InstituteFest";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttonStyle: {
    minWidth: 180,
    height: 55,
    margin: theme.spacing(1),
    background: "skyblue",
  },
}));

export default function InstituteEvents() {
  const classes = useStyles();

  const [event, setEvent] = useState("");

  const [component, setcomponent] = useState("fest");

  const handleEventSelect = (clickEvent) => {
    setEvent(clickEvent.target.value);
    setcomponent(clickEvent.target.value);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          md={3}
          lg={3}
          className="align-items-center justify-content-center d-flex"
        >
          <h1>Institute Events</h1>
        </Grid>

        <Grid item xs={6} md={3} lg={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="events-input-label">Institute Events</InputLabel>
            <Select
              label="Institute Events"
              id="college-events-dropdown"
              onChange={handleEventSelect}
              value={event}
            >
              <MenuItem value="fest">Technical Fest</MenuItem>
              <MenuItem value="gdpi">GD/PI</MenuItem>
              <MenuItem value="videos">Institute Videos</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3} lg={3}>
          <Button
            className={classes.buttonStyle}
            variant="success"
            id="latest-event"
          >
            Latest
          </Button>
        </Grid>

        <Grid item xs={6} md={3} lg={3}>
          <Button
            className={classes.buttonStyle}
            variant="success"
            id="oldest-event"
          >
            Oldest
          </Button>
        </Grid>
      </Grid>

      {component === "fest" ? (
        <div style={{ height: "fit-content" }}>
          <InstituteFest />
        </div>
      ) : component === "gdpi" ? (
        <div style={{ height: "fit-content" }}>
          <GDPI />
        </div>
      ) : (
        <div style={{ height: "fit-content" }}>
          <InstituteVideos />
        </div>
      )}
    </div>
  );
}
