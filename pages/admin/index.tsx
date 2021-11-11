import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { Autocomplete, TextField } from "@mui/material";
import Layout from "../../src/components/Layout";
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import Table, { FoodRow, createData } from '../../src/components/Table';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  label?: string,
  account?: {
      create: {
          password: string;
          permissions: {
              connect: string;
          };
      };
  };
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

const Admin: NextPage = () => {
  // create a get all users endpoint
  const mockUsers: User[] = [
    {
      id: "ckvtcy4e30014jqus0gk4koe4",
      name: "John Doe",
      email: "john@example.com",
      emailVerified: new Date(),
      account: {
        create: {
          password: "123",
          permissions: {
            connect: "user",
          },
        },
      },
    },
    {
      id: "ckvtcy4e80029jqus9m2xy61t",
      name: "Jane Doe",
      email: "admin@example.com",
      emailVerified: new Date(),
      account: {
        create: {
          password: "123",
          permissions: {
            connect: "admin",
          },
        },
      },
    },
  ];

  const mockUsersOptions = mockUsers.map((user: User) => {
    return {...user, label: user.name};
  });

  const [activeTab, setActivetab] = useState(0);
  const [selectedUser, setSelectedUser] = useState(mockUsersOptions[0] as User | null);

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
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={mockUsersOptions}
            onChange={(event: any, newValue: User | null) => {
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

          <Table 
            headers={["Food Name", "Calories", "Date", "Controls"]}
            admin={true}
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
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <h1>Item Two</h1>
        </TabPanel>
      </Layout>
    </div>
  );
};

export default Admin;
