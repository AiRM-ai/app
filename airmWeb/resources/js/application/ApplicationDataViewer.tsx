// resources/js/components/ChatWindow.tsx
import React, { useState, useEffect, useRef, FC, KeyboardEvent, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

// Components from resources/js/components/applicationComponents/dashboardComponents
import ApplicationTopBar from "../components/applicationComponents/dashboardComponents/ApplicationTopBar";
import TabLayout from "../components/applicationComponents/dashboardComponents/TabLayout";
import FileUploadButton from "../components/applicationComponents/dashboardComponents/FileUploadButton";
import DataTable from "../components/applicationComponents/dataViewerComponents/DataTable";

const ApplicationDataViewer: FC = () => 
{
    return (
        <div className = "w-full p-6 mt-4 mb-3">
            {/* MAIN APPLICATION GRID */}
            <Grid container 
                spacing={4}
                justifyContent={"center"} // centers items vertically
                direction="column"  // stacks items
                alignContent={"center"} // centers items horizontally
                alignItems="center"
                sx={{ width: '100%', 
                        border: '1px solid grey'
                    }}
            >
                <Grid size = {8}>
                    <DataTable />
                </Grid>
            </Grid>
        </div>
    );
}

export default ApplicationDataViewer;