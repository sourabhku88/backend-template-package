# Simple Express Backend Template (TypeScript,JavaScript)

This is a simple template for setting up an Express.js backend with environment variable support using `dotenv`, and automatic server restart during development using `nodemon`.

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [npm](https://npmjs.com/) (Node Package Manager)

## Getting Started

Follow these steps to set up the project locally:

### 1. Just Run

```
npx basic-backend-by-sourabh <folder name>
```
`express` - for setting up the backend server
`dotenv` - to load environment variables from .env file
`nodemon` - for automatically restarting the server during development
### 2. Setup Environment Variables
Create a .env file in the root of your project. This file will hold any environment variables that your app needs.

Example .env file:

makefile
PORT=3000
You can add any other environment variables here as needed.

### 3. Open Your Project in the Browser
By default, the app will be accessible at:

js - http://localhost:5000

ts - http://localhost:7000

If you've changed the PORT in the .env file, make sure to open the server at the correct port.

JS and mongodb Folder Structure 

```bash
/<root-folder>
├── /node_modules/      # Project dependencies
├── /src/               # Source code files
│   ├── /config/        # database configuration and etc.
│   ├── /utils/         # reusable code
│   ├── /controllers/   # Controllers for handling requests
│   ├── /model/         # Database model 
│   ├── /routes/        # Express routes
│   ├── /middlewares/   # Express middleware (e.g., authentication, logging)
│   └── index.js        # Main application setup and server
├── .env                # Environment variables
├── .gitignore          # Ignore node_modules and other unnecessary files from git
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Locked dependencies for reproducible installs
└── README.md           # This file
```

TS and Mogodb
```bash
/<root-folder>
├── /node_modules/          # Project dependencies
├── /nginx/                 # Nginx configuration files (if any)
├── /scripts/               # Miscellaneous scripts (if any)
├── /test/                  # Test files
├── /src/                   # Source code files
│   ├── /config/            # Configuration files (e.g., database setup)
│   │   ├── databaseConnection.ts  # Database connection logic
│   │   ├── env.ts          # Environment variable setup
│   │   └── morgan.ts       # Logging configuration (using morgan)
│   ├── /utils/             # Reusable utility functions
│   │   ├── httpError.ts    # Custom error handling
│   │   ├── httpResponse.ts # Helper for standardizing responses
│   │   └── logger.ts       # Logger utility
│   ├── /controllers/       # Controllers for handling requests
│   │   └── health.ts       # Example controller (Health check)
│   ├── /models/            # Database models (MongoDB schemas)
│   ├── /routes/            # Express route definitions
│   │   └── index.ts        # Main routing logic
│   ├── /middlewares/       # Express middlewares (e.g., auth, logging)
│   │   └── apiAuth.ts      # Authentication middleware
│   └── index.ts            # Main application entry point (server setup)
├── .env                    # Environment variables file
├── .gitignore              # Ignore node_modules and other unnecessary files
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Locked dependencies for reproducible installs
└── README.md               # Project documentation

```