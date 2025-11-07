// resources/js/components/ChatWindow.tsx
import React, { useState, useEffect, useRef, FC, KeyboardEvent, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

// Components from resources/js/components/applicationComponents/dashboardComponents
import ApplicationTopBar from "../components/applicationComponents/dashboardComponents/ApplicationTopBar";
import TabLayout from "../components/applicationComponents/dashboardComponents/TabLayout";
import FileUploadButton from "../components/applicationComponents/dashboardComponents/FileUploadButton";
import ApplicationDataViewer from './ApplicationDataViewer';
import ApplicationProcessData from './ApplicationProcessData';


const ApplicationDashboard: FC = () => 
{
    // Current Tab State
    const [tabValue, setTabValue] = useState(0);

    // Handler to switch tabs and all
    const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
        setTabValue(newValue);
    };

    // Function to decide which page to render
    const renderPage = () => {
        console.log("TAB VALUE =" + tabValue);

        switch (tabValue) {
        case 0:
            return <ApplicationProcessData />;
        case 1:
            return <ApplicationDataViewer />;
        case 2:
            // PLEASE CHANGE
            return <ApplicationProcessData />;
        default:
            return <ApplicationProcessData />;
        }
    };

    return (
        <div>
            {/* Application Top Bar */}
            <ApplicationTopBar tabValue={tabValue} handleTabChange={handleTabChange} />

            {/* MAIN APPLICATION GRID */}
            {/* Based on which tab is selected lol */}
            <Box>
                {renderPage()}
            </Box>
        </div>
    );
}

export default ApplicationDashboard;