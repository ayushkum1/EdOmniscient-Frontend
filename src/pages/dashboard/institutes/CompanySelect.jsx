import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Avatar,
  Button,
  Chip,
  DialogActions,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  useTheme,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { patchCompanies } from "./upload_helper/company.service";

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: "20em",
    maxWidth: "30em",
    textOverflow: "ellipsis",
  },
  chipPaper: {
    minHeight: "10em",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",

    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
}));

function CompanySelect(props) {
  const {
    open,
    onClose,
    token,
    instituteId,
    companyList,
    enqueueSnackbar,
    snackbarProps,
    refresh,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [selected, setSelected] = useState([]);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = () => {
    const ids = selected.map((c) => c.id);
    console.log(ids);

    // The payload object structure is strictly {op : "add | remove", companies: [companyId1, companyId2,...]}
    patchCompanies(token, instituteId, { op: "add", companies: ids })
      .then((resp) => {
        enqueueSnackbar(
          resp.data.message,
          snackbarProps(resp.data.messageType)
        );
        refresh();
      })
      .catch((err) => {
        enqueueSnackbar(
          err.response.data.message,
          snackbarProps(err.response.data.messageType)
        );
      })
      .finally(() => {
        handleClose();
      });
  };

  const handleClose = () => {
    setSelected([]);
    onClose();
  };

  const menuProps = {
    classes: {
      paper: classes.menuPaper,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Select companies</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.chipPaper}>
              {selected.map((c) => (
                <Chip
                  key={c.id}
                  label={c.name}
                  avatar={<Avatar alt={c.name} src={c.logoUrl} />}
                  style={{
                    margin: theme.spacing(1),
                  }}
                />
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="company-mutiple-select-label">
                Companies
              </InputLabel>
              <Select
                labelId="company-mutiple-select-label"
                id="company-mutiple-select"
                multiple
                value={selected}
                onChange={handleChange}
                input={<Input />}
                MenuProps={menuProps}
              >
                {companyList.map((c) => (
                  <MenuItem key={c.id} value={c}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ marginTop: "1em" }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CompanySelect;
