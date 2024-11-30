# Simple Express Backend Template

This is a simple template for setting up an Express.js backend with environment variable support using `dotenv`, and automatic server restart during development using `nodemon`.

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [npm](https://npmjs.com/) (Node Package Manager)

## Getting Started

Follow these steps to set up the project locally:

### 1. Just Run

```
basic-backend-by-sourabh
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

http://localhost:7000

If you've changed the PORT in the .env file, make sure to open the server at the correct port.

Code Structure

``````
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