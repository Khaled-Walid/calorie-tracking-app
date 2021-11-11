import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Layout from "../src/components/Layout";
import Typography from "@mui/material/Typography";
import NewEntry from "../src/components/NewEntry";
import { useState } from "react";
import Table, { createData } from "../src/components/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addFood, getFood } from "../src/clientApi/user/food";

const Home: NextPage = () => {
  const [calorieBudget, setCalorieBudget] = useState(0);
  const [calorieLimit, setCalorieLimit] = useState(2100);

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery('foodEntries', getFood);

  const addEntryMutation = useMutation(addFood, {
    onSuccess() {
      queryClient.invalidateQueries('foodEntries');
    }
  });

  const handleAddFoodEntry = (foodName: string, calorieCount: string, dateValue: Date) => {
    addEntryMutation.mutate({
      name: foodName,
      calories: +calorieCount,
      consumedAt: dateValue,
    });
  }

  return (
    <div className={styles.container}>
      <Layout>
        <Typography variant="h6" gutterBottom component="div">
          Calorie Budget:{" "}
          <Typography
            variant="h6"
            sx={{ display: "inline-block", color: "green" }}
          >
            {calorieBudget}
          </Typography>
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          Calorie Limit:{" "}
          <Typography
            variant="h6"
            sx={{ display: "inline-block", color: "red" }}
          >
            {calorieLimit}
          </Typography>
        </Typography>
        {calorieBudget < calorieLimit ? (
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ color: "green", marginBottom: "25px" }}
          >
            You’re still below the calorie limit for today!
          </Typography>
        ) : (
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ color: "red", marginBottom: "25px" }}
          >
            You’ve exceeded the calorie limit for today!
          </Typography>
        )}

        <NewEntry
          handleAddFoodEntry={handleAddFoodEntry}
        />
        {data && (
          <Table
            headers={["Food Name", "Calories", "Date/Time"]}
            rows={
              data.map(({ name, calories, consumedAt }) => createData(name, calories, new Date(consumedAt)))
            }
          />
        )}
      </Layout>
    </div>
  );
};

export default Home;
