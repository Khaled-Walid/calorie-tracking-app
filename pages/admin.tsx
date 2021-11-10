import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Layout from "../src/components/Layout";
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// support `aria-controls` for accessibility
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Admin: NextPage = () => {
  const [activeTab, setActivetab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActivetab(newValue);
  };

  return (
    <div className={styles.container}>
      <Layout>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Food Items" {...a11yProps(0)} />
          <Tab label="Report Screen" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      </Layout>
    </div>
  );
}

export default Admin;