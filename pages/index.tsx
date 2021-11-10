import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Layout from "../src/components/Layout";
import Typography from "@mui/material/Typography";
import NewEntry from "../src/components/NewEntry";
import { useState } from "react";

const Home: NextPage = () => {
  const [calorieBudget, setCalorieBudget] = useState(0);
  const [calorieLimit, setCalorieLimit] = useState(2100);

  return (
    <div className={styles.container}>
      <Layout>
        <h1>Hi there</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </p>
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
      </Layout>
    </div>
  );
};

export default Home;
