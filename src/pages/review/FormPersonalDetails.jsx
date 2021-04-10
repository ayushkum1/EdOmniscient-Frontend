import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function FormPersonalDetails(props) {
  const { values, handleChange } = props;

  const next = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography variant="h4" align="center">
          Tell Us who you are
        </Typography>
        <Container maxWidth="sm">
          <Paper elevation={5} style={{ padding: "2em" }}>
            <Grid container spacing={3} style={{ alignItems: "flex-end" }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="standard-required"
                  label="Full Name"
                  onChange={handleChange("yourFullName")}
                  defaultValue={values.yourFullName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="standard-required"
                  label="Email"
                  onChange={handleChange("yourFullName")}
                  defaultValue={values.yourFullName}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="standard-required"
                  label="College You Are Reviewing"
                  onChange={handleChange("collegeYouAreReviewing")}
                  defaultValue={values.collegeYouAreReviewing}
                />
              </Grid>
              <Grid item xs={4}>
                <KeyboardDatePicker views={["year"]} onChange={() => {}} />
              </Grid>

              <Grid item>
                <Button
                  label="next"
                  variant="contained"
                  color="primary"
                  onClick={next}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default FormPersonalDetails;
