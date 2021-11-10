import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function ResponsiveDatePickers(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture
        label="Enter Date"
        openTo="year"
        views={["year", "month", "day"]}
        value={props.value}
        onChange={(newValue) => {
          props.onChange(newValue);
        }}
        renderInput={(params) => <TextField sx={{ width: 300 }} {...params} />}
      />
    </LocalizationProvider>
  );
}
