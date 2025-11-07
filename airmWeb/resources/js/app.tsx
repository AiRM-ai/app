import '../css/app.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Components
import ApplicationDashboard from "./application/ApplicationDashboard";

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Render our app
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();


// APPLICATION (BACKEND) FUNCTIONS
/**
 * Render the app in the webpage
 * Render the dashboard,
 * Should have the elements
 *      - Navbar with all the required tabs
 *      - File Upload
 *      - File History
 *      - More details in the file
 * 
 * @returns the backend page for the dashboard of the application
 */
const dashboardElement = document.getElementById('application-dashboard');

if (dashboardElement) 
{
    const root = ReactDOM.createRoot(dashboardElement);
    root.render(
        <React.StrictMode>
            <ApplicationDashboard />
        </React.StrictMode>
    );
}