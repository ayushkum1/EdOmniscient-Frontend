import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, makeStyles } from "@material-ui/core";
import {
  cityList,
  stateList,
  regionList,
} from "../../../components/common/constants";

const useStyles = makeStyles((theme) => ({
  numberInput: {
    "& input[type='number']::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
    },
  },
}));

function AddorEditInstituteForm(props) {
  const classes = useStyles();
  const { open, onClose, form, handleFormChange, instAdmins } = props;

  //   const emptyForm = form;
  const [formDetails, setFormDetails] = useState(form);

  useEffect(() => {
    setFormDetails(form);
  }, [form]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Institute Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out this form to add / update an institute.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <TextField
                id="institute-id"
                label="ID"
                value={String(formDetails.id)}
                onChange={(event) =>
                  setFormDetails({ ...formDetails, id: event.target.value })
                }
                type="number"
                fullWidth
                className={classes.numberInput}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <TextField
                id="institute-name"
                label="Name"
                value={formDetails.name}
                onChange={(event) =>
                  setFormDetails({ ...formDetails, name: event.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="institute-nick"
                label="Nickname"
                value={formDetails.nick}
                onChange={(event) =>
                  setFormDetails({ ...formDetails, nick: event.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="institute-street-addr"
                label="Street Address"
                value={formDetails.streetAddr}
                onChange={(event) =>
                  setFormDetails({
                    ...formDetails,
                    streetAddr: event.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="institute-city-label">City</InputLabel>
              <Select
                id="institute-city"
                labelId="institute-city-label"
                label="City"
                value={formDetails.city}
                onChange={(event) =>
                  setFormDetails({ ...formDetails, city: event.target.value })
                }
                fullWidth
              >
                {cityList.map((c, i) => (
                  <MenuItem key={i} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="institute-pincode"
                label="Pin Code"
                value={formDetails.pinCode}
                onChange={(event) =>
                  setFormDetails({
                    ...formDetails,
                    pinCode: event.target.value,
                  })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel id="institute-state-label">State</InputLabel>
              <Select
                id="institute-state"
                labelId="institute-state-label"
                label="State"
                value={formDetails.state}
                onChange={(event) =>
                  setFormDetails({ ...formDetails, state: event.target.value })
                }
                fullWidth
              >
                {stateList.map((s, i) => (
                  <MenuItem key={i} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="institute-region-label">Region</InputLabel>
              <Select
                id="institute-region"
                labelId="institute-region-label"
                label="Region"
                value={formDetails.region}
                onChange={(event) =>
                  setFormDetails({ ...formDetails, region: event.target.value })
                }
                fullWidth
              >
                {regionList.map((r, i) => (
                  <MenuItem key={i} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="institute-inst-admin-label">
                Institute Admin
              </InputLabel>
              <Select
                id="institute-inst-admin"
                labelId="institute-inst-admin-label"
                label="Institute Admin"
                value={formDetails.instAdmin}
                onChange={(event) =>
                  setFormDetails({
                    ...formDetails,
                    instAdmin: event.target.value,
                  })
                }
                fullWidth
              >
                {instAdmins.map((r, i) => (
                  <MenuItem key={i} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ marginTop: "2em", padding: "1em" }}>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => handleFormChange(formDetails)}
            variant="contained"
            color="primary"
            style={{ marginLeft: "2em" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddorEditInstituteForm;
