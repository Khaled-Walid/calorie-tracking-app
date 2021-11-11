import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box } from "@mui/system";
import { useState } from "react";
import { useQuery } from "react-query";
import { findFood } from '../clientApi/calories';
import { FoodCalorie } from "../api/calories";
import DateTimePicker from "@mui/lab/DateTimePicker";

type NfslType = FoodCalorie & {
  label: string;
};

export default function NewEntry(props: any) {
  const [dateValue, setDateValue] = React.useState<Date | null>(props.dateValue || new Date());
  const [foodName, setFoodName] = useState(props.foodName || "");
  const [calorieCount, setCalorieCount] = useState(props.calorieCount || "");
  const [foodOption, setFoodOption] = useState<NfslType | null>(null);

  const { data: queryData, isLoading } = useQuery(`nutritionix/${foodName}`, () => findFood(foodName));

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <DateTimePicker
        disableFuture
        label="Enter Date/Time"
        value={dateValue}
        onChange={setDateValue}
        renderInput={(params) => <TextField sx={{ width: 300 }} {...params} />}
      />
      <Autocomplete
        sx={{ width: 300, margin: "25px 0" }}
        freeSolo
        value={foodOption}
        onChange={(_event, newValue) => {
          if (typeof newValue === 'object') {
            setFoodOption(newValue);
            if (newValue) {
              setFoodName(newValue);
              setCalorieCount(newValue.calories);
            }
          }
        }}
        inputValue={foodName}
        onInputChange={(_event, newInputValue) => {
          setFoodName(newInputValue);
        }}
        options={!isLoading && queryData ? queryData.map(zebla => ({...zebla, label: zebla.name})) : []}
        renderInput={(params) => <TextField {...params} label="Food Name" />}
      />
      <TextField
        sx={{ width: 300 }}
        label="Calorie Count"
        variant="outlined"
        onChange={(e) => {
          setCalorieCount(e.target.value);
        }}
        value={calorieCount}
      />
      <Button
        variant="contained"
        sx={{
          width: 300,
          color: "white",
          backgroundColor: "blue",
          margin: "25px 0",
        }}
        onClick={() => {
          props.handleAddFoodEntry(foodName, calorieCount, dateValue);
          setFoodName('');
          setFoodOption(null);
          setCalorieCount('');
        }}
      >
        <AddBoxIcon /> &nbsp; {props.foodId? "Edit" : "Add"} Food Entry
      </Button>
    </Box>
  );
}
