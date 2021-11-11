import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Layout from "../src/components/Layout";
import Typography from "@mui/material/Typography";
import NewEntry from "../src/components/NewEntry";
import { useState } from "react";
import Table, { FoodRow, createData } from "../src/components/Table";

const Home: NextPage = () => {
  const [calorieBudget, setCalorieBudget] = useState(0);
  const [calorieLimit, setCalorieLimit] = useState(2100);

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

        <NewEntry></NewEntry>
        <Table
          headers={["Food Name", "Calories"]}
          rows={
            [
              createData("Frozen yoghurt", 159),
              createData("Ice cream sandwich", 237),
              createData("Eclair", 262),
              createData("Cupcake", 305),
              createData("Gingerbread", 356),
            ] as FoodRow[]
          }
        />
      </Layout>
    </div>
  );
};

export default Home;
