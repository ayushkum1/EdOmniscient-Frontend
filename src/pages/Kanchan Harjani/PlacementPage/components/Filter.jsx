import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getCardsData, getCourses } from "../services/placementService";
import FilterListIcon from "@material-ui/icons/FilterList";

import Select from "./Select";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function Filter(props) {
  const { token, instituteId, setFilterValues } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [courseList, setCourseList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    getCourses(token, instituteId).then((response) => {
      const retVal = response.data.map((r) => {
        return {
          id: r.id,
          title: r.name,
        };
      });
      setCourseList(retVal);
    });
  }, [token, instituteId]);

  useEffect(() => {
    getCardsData(
      token,
      instituteId,
      values.batch,
      values.year,
      values.courseName
    )
      .then((response) => {
        props.setCurrentRecord(response.data);
        console.log("inside filter component ", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token, refresh]);

  const handleClose = () => {
    setFilterValues(values);
    setRefresh(!refresh);
    setOpen(false);
  };

  const getYearDetails = [
    { id: "1", title: "2021" },
    { id: "2", title: "2020" },
    { id: "3", title: "2019" },
    { id: "4", title: "2018" },
    { id: "5", title: "2017" },
  ];

  const getBatchDetails = [
    { id: "1", title: "FEBRUARY" },
    { id: "2", title: "AUGUST" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <Button
        style={{ width: "8em" }}
        startIcon={<FilterListIcon />}
        onClick={handleClickOpen}
      >
        Filter
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Enter the Filter Criteria</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <Select
              name="batch"
              label="Batch"
              value={values?.batch}
              onChange={handleInputChange}
              options={getBatchDetails}
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
            />
            <Select
              name="year"
              label="Year"
              value={values?.year}
              onChange={handleInputChange}
              options={getYearDetails}
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
            />
            <Select
              name="courseName"
              label="Course"
              value={values?.courseName}
              onChange={handleInputChange}
              options={courseList}
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
