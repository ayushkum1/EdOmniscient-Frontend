import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { applyMembership } from "../../Channappa_Mirgale/services/member-helper";
import { useSnackbar } from "notistack";

function BecomeMemberForm(props) {
  const {
    open,
    onClose,
    instituteId,
    courseList,
    token,
    user,
    snackbarProps,
  } = props;

  const emptyForm = {
    email: "",
    memberType: "",
    prn: "",
    phone: "",
    courseId: "",
    year: new Date(),
  };
  const lettersOnlyRE = /^[a-zA-Z\s]+$/;
  const emailRE = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const phoneRE = /^[0-9]{10}$/;

  const [memberForm, setMemberForm] = useState(emptyForm);
  const [valid, setValid] = useState({
    email: true,
    memberType: true,
    courseId: true,
    prn: true,
    phone: true,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setMemberForm(emptyForm);
    onClose();
  };

  const validate = () => {
    let valid = {
      email: emailRE.test(memberForm.email),
      memberType: lettersOnlyRE.test(memberForm.memberType),
      courseId: String(memberForm.courseId).length > 0,
      prn: String(memberForm.prn).length > 0,
      phone: phoneRE.test(memberForm.phone),
    };
    setValid(valid);

    return Object.values(valid).every((x) => x === true);
  };

  const handleChange = (e) => {
    setMemberForm({ ...memberForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(validate());
    if (validate()) {
      console.log("submit");

      applyMembership(token, instituteId, user.email, memberForm)
        .then((resp) => {
          console.log(resp.data);
          enqueueSnackbar(
            "Successfully applied for membership",
            snackbarProps("success")
          );
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response);
          enqueueSnackbar(
            "Membership application failed. Try again after some time.",
            snackbarProps("error")
          );
        })
        .finally(() => {
          handleClose();
        });
    } else {
      console.log("not submit");
    }
  };

  const memberTypes = ["STUDENT", "ALUMNI", "FACULTY"];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle id="form-dialog-title">Members Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to apply for membership.
          </DialogContentText>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                value={memberForm.email}
                // onChange={(e) =>
                //   setMemberForm({ ...memberForm, email: e.target.value })
                // }
                onChange={handleChange}
                error={!valid.email}
                name="email"
                id="email"
                label="Email"
                type="email"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl error={!valid.memberType} fullWidth required>
                <InputLabel id="demo-simple-select-label">
                  Membership type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="memberType"
                  value={memberForm.memberType}
                  // onChange={(e) =>
                  //   setMemberForm({ ...memberForm, memberType: e.target.value })
                  // }
                  onChange={handleChange}
                >
                  {memberTypes.map((item, idx) => (
                    <MenuItem key={idx} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={memberForm.prn}
                // onChange={(e) =>
                //   setMemberForm({ ...memberForm, prn: e.target.value })
                // }
                onChange={handleChange}
                error={!valid.prn}
                name="prn"
                id="prn"
                label="PRN"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={memberForm.phone}
                // onChange={(e) =>
                //   setMemberForm({ ...memberForm, phone: e.target.value })
                // }
                onChange={handleChange}
                error={!valid.phone}
                name="phone"
                id="phnNo"
                label="Phone No"
                type="number"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl error={!valid.courseId} fullWidth required>
                <InputLabel id="course-select-label">Course</InputLabel>
                <Select
                  labelId="course-select-label"
                  id="course-select"
                  name="courseId"
                  value={memberForm.courseId}
                  // onChange={(e) =>
                  //   setMemberForm({ ...memberForm, memberType: e.target.value })
                  // }
                  onChange={handleChange}
                >
                  {courseList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                value={memberForm.year}
                onChange={(e) => setMemberForm({ ...memberForm, year: e })}
                maxDate={new Date()}
                name="year"
                variant="inline"
                views={["year"]}
                label="Graduation year"
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
}

export default BecomeMemberForm;
