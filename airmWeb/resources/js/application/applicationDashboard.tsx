// resources/js/components/ChatWindow.tsx
import React, { useState, useEffect, useRef, FC, KeyboardEvent, ChangeEvent } from 'react';

// Components from resources/js/components/applicationComponents/dashboardComponents
import ApplicationTopBar from "../components/applicationComponents/dashboardComponents/ApplicationTopBar";
import TabLayout from "../components/applicationComponents/dashboardComponents/TabLayout";

const ApplicationDashboard: FC = () => 
{
    return (
        <div>
            {/* Application Top Bar */}
            <ApplicationTopBar />

            {/* TABS */}
            <TabLayout />

            {/* Testing */}
            <h1 className="text-blue-500">Import Documents</h1>
            <h1>Import History</h1>
        </div>
    );
}

export default ApplicationDashboard;