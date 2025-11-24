# AIRM
App Repository for the laravel web application. 

# Team Members:
Alisa Sumwalt, Kevin Beutler, and Bhushith Gujjala Hari.

# Tech Stack:
1. Laravel with Blade, React, and Alpine – used for the main backend logic, templating, and integration of the interactive frontend components.
2. Laravel Breeze for User Authentication – provides the login, registration, and session management system for the AiRM web application.
3. Vite, Tailwind CSS, and PostCSS for Frontend Styling & Bundling – used to compile CSS, bundle JavaScript/TypeScript, and style the entire AiRM website and dashboard.
4. React with TypeScript – used to build interactive UI components and dynamic pages within the web application.
5. Node.js & NPM – powers the frontend build pipeline and installs all JavaScript dependencies.
6. Composer – manages PHP dependencies required by Laravel and backend services.
7. MySQL / PostgreSQL – database engines used to store user data, item catalogs, and application records.

# Installation and Running Instructions:
**Please clone this repo and access the "AIRM: TUTORIAL and HOW-TO" document to get a full, detailed guide on how to run, access, and use the AiRM software.**


# File Structure Overview: 

1. airmWeb/app : contains Laravel’s controllers, models, middleware, service providers, and backend application logic.
2. airmWeb/bootstrap : holds the application bootstrapping files and cached configuration used by Laravel during startup.
3. airmWeb/config : contains all configuration files for authentication, database connections, caching, mail, sessions, queues, and other Laravel services.
4. airmWeb/database : includes database migrations, seeders, and factories used to initialize and structure the database; also includes database.sqlite for local development.
5. airmWeb/node_modules : stores all Node.js dependencies used for React, Vite, Tailwind, and other frontend tooling.
6. airmWeb/public : contains public-facing assets such as images, icons, profile pictures, and the Laravel entry point (index.php), as well as the assets for the AiRM website.
7. airmWeb/resources/css : contains CSS files used by Vite and Tailwind to generate the application’s compiled stylesheet.
8. airmWeb/resources/js : contains all React components, TypeScript utilities, hooks, layouts, and application pages for the web application frontend.
9. airmWeb/resources/views : includes Blade templates for the website pages, layouts, navigation bars, footers, profile views, product pages, and authentication screens.
10. airmWeb/routes : contains Laravel route files (web.php, api.php, console.php, and additional route definitions for application behavior).
11. airmWeb/storage : provides the storage directory for logs, cached files, compiled views, and uploaded documents.
12. airmWeb/tests : includes the automated test suite used for application testing.
13. airmWeb/.github/workflows : contains GitHub Actions CI/CD workflows for linting, automated testing, and repository maintenance.
14. airmWeb/.env & .env.example : store environment variables for database credentials, Mail services, and application configuration.
15. airmWeb/vendor : includes all Composer-installed PHP packages used by Laravel and its backend dependencies.
16. airmWeb/composer.json & composer.lock : define Laravel’s PHP dependencies, backend library versions, and autoload settings.
17. airmWeb/package.json & package-lock.json : define JavaScript/TypeScript dependencies for React, Tailwind, Vite, and development tools.
18. airmWeb/vite.config.js / vite.config.ts : configuration files for Vite bundling and hot module reloading for both the website and the web application.
19. airmWeb/tailwind.config.js : configuration for Tailwind CSS, theme customization, and component styling.
20. airmWeb/postcss.config.js : contains PostCSS plugins and Tailwind CSS processing rules.
21. airmWeb/tsconfig.json : TypeScript configuration for React components and frontend logic within the application.
22. airmWeb/.prettierrc & .prettierignore : configuration files used for code formatting and enforcing consistent frontend/backend styles.
23. airmWeb/.gitignore & .gitattributes : define Git behavior for ignoring build files and controlling repository attributes.
24. airmWeb/LICENSE & README.md : the project’s license file and the main project documentation.

# Attribution:
1. React Material UI Component Library: https://mui.com/material-ui/ 
    - Citation: “Material UI: REACT Components That Implement Material Design.” Material UI: React Components That Implement Material Design, mui.com/material-ui/. Accessed 3 Nov. 2025. 
    - Context: Used for the components of the web application for AiRM.
    
