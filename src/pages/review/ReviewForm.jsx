import React, { useState } from "react";
import FormPersonalDetails from "./FormPersonalDetails";
import YourReview from "./YourReviews";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ReviewForm = (props) => {
  const [formData, setFormData] = useState({
    yourFullName: "",
    email: "",
    collegeYouAreReviewing: "",
    yearOfPassOut: "",
  });
  const [step, setStep] = useState(1);
  const history = useHistory();

  // state = {
  //   step: 1,
  //   yourFullName: "",
  //   email: "",
  //   mobileNo: "",
  //   collegeYouAreReviewing: "",
  //   yearOfPassOut: "",
  // };

  //proceed to next Step
  const nextStep = () => {
    setStep(step + 1);
  };
  //Go back to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  //Handle Fields change
  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const {
    yourFullName,
    email,
    collegeYouAreReviewing,
    yearOfPassOut,
  } = formData;

  const values = {
    yourFullName,
    email,
    collegeYouAreReviewing,
    yearOfPassOut,
  };

  switch (step) {
    case 1:
      return (
        <FormPersonalDetails
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 2:
      return (
        <YourReview
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 3:
      return (
        <div style={{ textAlign: "center" }}>
          <Typography variant="h2" align="center">
            Thank You for your valuable Review
          </Typography>
          <Button onClick={() => history.push("/")}>Take me To Home</Button>
        </div>
      );
  }

  return <div></div>;
};

export default ReviewForm;
