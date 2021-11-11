import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { Autocomplete, TextField } from "@mui/material";
import Layout from "../../src/components/Layout";
import { Tabs, Tab, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Table, { FoodRow, createData } from '../../src/components/Table';
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { getUsers } from "../../src/clientApi/admin/users";
import { User } from "../../src/api/users";
import { getFood } from "../../src/clientApi/admin/food";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// support `aria-controls` for accessibility
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AverageCalories = (props: any) => {
  const [avgCalories, setAvgCalories] = useState(0);

  useEffect(() => {
    const mockFoodItems: any = {
      "ckvtcy4e80029jqus9m2xy61t": 200,
      "ckvtcy4e30014jqus0gk4koe4": 400,
    }
    if (props.selectedUser?.id) {
      setAvgCalories(mockFoodItems[props.selectedUser.id]);
    } else {
      setAvgCalories(0);
    }
  }, [props.selectedUser]);

  return (
    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", whiteSpace: "pre"}}>
      <Typography variant="h6" gutterBottom component="div" sx={{maxHeight: "50px"}}>
        Average Number of Calories for user:{" "}
      </Typography>
      <Autocomplete
        disablePortal
        options={props.mockUsersOptions}
        onChange={(_event, newValue) => {
          props.setSelectedUser(newValue);
        }}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        value={props.selectedUser}
        sx={{ width: 300, display: "inline-block" }}
        renderInput={(params) => (
          <TextField {...params} label="User" />
        )}
      />
      <Typography variant="h6">{" "}is{" "}</Typography>
      <Typography variant="h6" sx={{ color: "green" }}>{avgCalories}{" "}</Typography>
      <Typography variant="h6">in the last 7 days</Typography>
    </Box>
  );
}

const UserTable = ({userId}: any) => {
  const fetchDataForUser = useCallback(() => getFood(userId), [userId]);
  const { isLoading: foodLoading, data: foodData } = useQuery(`admin/foodEntries/${userId}`, fetchDataForUser);

  return foodData ? (
    <Table 
      headers={["Food Name", "Calories", "Date", "Controls"]}
      admin={true}
      rows={
        foodData.map(({ name, calories, consumedAt }) => createData(name, calories, new Date(consumedAt)))
      }
    />
  ) : null;
};

const Admin: NextPage = () => {
  const { data: users, isLoading: usersLoading } = useQuery('users', getUsers);

  const userOptions = users && users.map(user => {
    return {...user, label: user.name};
  });

  const [activeTab, setActivetab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(userOptions ? userOptions[0] : null);
  const [lastSevenDays, setLastSevenDays] = useState(0);
  const [weekBefore, setWeekBefore] = useState(0);
  const [entriesToday, setEntriesToday] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActivetab(newValue);
  };

  return (
    <div className={styles.container}>
      <Layout>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All Food Items" {...a11yProps(0)} />
            <Tab label="Report Screen" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={activeTab} index={0}>
          {userOptions && (
            <Autocomplete
              disablePortal
              options={userOptions}
              onChange={(_event, newValue) => {
                setSelectedUser(newValue);
              }}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              value={selectedUser}
              sx={{ width: 300, margin: "25px 0" }}
              renderInput={(params) => (
                <TextField {...params} label="User" />
              )}
            />
          )}

          {selectedUser && <UserTable userId={selectedUser.id} />}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom component="div">
            Number of Entries in the Last 7 Days:{" "}
            <Typography
              variant="h6"
              sx={{ display: "inline-block", color: "green" }}
            >
              {lastSevenDays}
            </Typography>
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            Number of Entries in the Last Week Before:{" "}
            <Typography
              variant="h6"
              sx={{ display: "inline-block", color: "green" }}
            >
              {weekBefore}
            </Typography>
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            Number of Entries Today:{" "}
            <Typography
              variant="h6"
              sx={{ display: "inline-block", color: "green" }}
            >
              {entriesToday}
            </Typography>
          </Typography>
          <AverageCalories
            mockUsersOptions={userOptions}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
            avgCalories={200}
          />
        </TabPanel>
      </Layout>
    </div>
  );
};

export default Admin;
