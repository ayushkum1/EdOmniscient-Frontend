// import React, { Fragment, useState } from "react";
// import { DatePicker as MuiDatePicker } from "@material-ui/pickers";

// export default function DatePicker() {
//   const [selectedDate, handleDateChange] = useState(new Date());

//   return (
//     <MuiDatePicker
//       views={["year"]}
//       label="Year only"
//       value={selectedDate}
//       onChange={handleDateChange}
//     />
//   );
// }
import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker as MuiDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        views={["year"]}
        format="yyyy"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
