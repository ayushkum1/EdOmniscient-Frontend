import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as placementService from "../../services/placement_data";
import * as ps from "../../services/placement_service";

const initialFValues = {
  id: 0,
  courseName: "",
  noPlacedStudents: 0,
  totalStudents: 0,
  batch: "",
  year: new Date(),
  maxLPAOffered: 0,
  avgLPAOffered: 0,
};

export default function PlacementForm(props) {
  const { addOrEdit, recordForEdit, courseList } = props;
  const [max, setMax] = useState(0);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [no, setNo] = useState(0);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("courseName" in fieldValues)
      temp.courseName = fieldValues.courseName ? "" : "This field is required.";

    if ("batch" in fieldValues)
      temp.batch = fieldValues.batch ? "" : "This field is required.";

    if ("totalStudents" in fieldValues) {
      if (fieldValues.totalStudents > 0) {
        setTotal(parseInt(fieldValues.totalStudents));
        temp.totalStudents = "";
      } else {
        temp.totalStudents = "This field is required";
      }
    }

    if ("noPlacedStudents" in fieldValues) {
      console.log(total);
      if (fieldValues.noPlacedStudents > 0) {
        setNo(parseInt(fieldValues.noPlacedStudents));
      }
      if (no > total) {
        temp.noPlacedStudents = "Cannot be greater than Total Students";
      } else {
        temp.noPlacedStudents = "";
      }
    }

    if ("maxLPAOffered" in fieldValues) {
      if (fieldValues.maxLPAOffered > 0) {
        setMax(parseInt(fieldValues.maxLPAOffered));
        temp.maxLPAOffered = "";
      } else {
        temp.maxLPAOffered = "This field is required";
      }
    }

    if ("avgLPAOffered" in fieldValues) {
      console.log(max);

      if (fieldValues.avgLPAOffered > 0) {
        setAvg(parseInt(fieldValues.avgLPAOffered));
      }
      if (avg > max) {
        temp.avgLPAOffered = "Cannot be greater than Max LPA Offered";
      } else {
        temp.avgLPAOffered = "";
      }
    }

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setRecord({ ...record, [name]: value });
  // };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Total Students"
            name="totalStudents"
            type="number"
            value={values.totalStudents}
            onChange={handleInputChange}
            error={errors.totalStudents}
          />
          <Controls.Input
            name="noPlacedStudents"
            label="No. of Placed Students"
            type="number"
            value={values.noPlacedStudents}
            onChange={handleInputChange}
            error={errors.noPlacedStudents}
          />
          <Controls.Input
            label="Max LPA Offered"
            name="maxLPAOffered"
            type="number"
            value={values.maxLPAOffered}
            onChange={handleInputChange}
            error={errors.maxLPAOffered}
          />
          <Controls.Input
            label="Avg LPA Offered"
            name="avgLPAOffered"
            type="number"
            value={values.avgLPAOffered}
            onChange={handleInputChange}
            error={errors.avgLPAOffered}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="courseName"
            label="Course"
            value={values.courseName}
            onChange={handleInputChange}
            options={courseList}
            error={errors.courseName}
          />
          <Controls.Select
            name="batch"
            label="Batch"
            value={values.batch}
            onChange={handleInputChange}
            options={placementService.getBatchDetails()}
            error={errors.batch}
          />
          <Controls.DatePicker
            name="year"
            label="Year"
            value={values.year}
            onChange={handleInputChange}
            //error={errors.year}
          />

          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
