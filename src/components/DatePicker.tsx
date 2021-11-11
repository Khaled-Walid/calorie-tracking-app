import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

export default function ResponsiveDatePickers(props: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        disableFuture
        label="Enter Date/Time"
        // openTo="year"
        // views={["year", "month", "day"]}
        value={props.value}
        onChange={(newValue) => {
          props.onChange(newValue);
        }}
        renderInput={(params) => <TextField sx={{ width: 300 }} {...params} />}
      />
    </LocalizationProvider>
  );
}
