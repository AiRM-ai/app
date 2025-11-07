import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Scrollable Tabs for Main Dashboard Layout"
      >
        <Tab label="Process Data" />
        <Tab label="Data Viewer" />
        <Tab label="View Results" />
        <Tab label="Test Item-4" />
        <Tab label="Test Item-5" />
        <Tab label="Test Item-6" />
        <Tab label="Test Item-7" />
      </Tabs>
    </Box>
  );
}
