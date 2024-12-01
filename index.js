#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { select } = require('@inquirer/prompts');


let languageChoice = null;
let dbChoice = null;


// Step 1: Get the folder name from the command-line arguments
const folderName = process.argv[2]; // The second argument is the folder name
if (!folderName) {
  console.error("❌ Error: Please specify a folder name.");
  console.log("Usage: npx basic-backend-by-sourabh <folder-name>");
  process.exit(1);
}

let targetPath = path.join(process.cwd(), folderName);
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath);
  console.log(` Created folder: ${folderName}`);
} else {
  console.error(`❌ Error: Folder '${folderName}' already exists.`);
  process.exit(1);
}

const getUserPreferences = async (targetPath) => {
  // Ask the user to select a language (JavaScript or TypeScript)
  languageChoice = await select({
    message: 'Which language would you like to use?',
    choices: [
      {
        name: 'JavaScript',
        value: 'JavaScript',
        description: 'JavaScript is a popular language for backend development',
      },
      {
        name: 'TypeScript',
        value: 'TypeScript',
        description: 'TypeScript adds static types to JavaScript for better tooling and scalability',
      },
    ],
  });

  // Ask the user to select a database (MongoDB or PostgreSQL)
  dbChoice = await select({
    message: 'Which database would you like to use?',
    choices: [
      {
        name: 'MongoDB',
        value: 'MongoDB',
        description: 'MongoDB is a NoSQL database that stores data in JSON-like documents',
      },
      {
        name: 'PostgreSQL',
        value: 'PostgreSQL',
        description: 'PostgreSQL is a powerful, open-source relational database',
      },
    ],
  });

  // Log the user's choices or proceed with template generation
  console.log(`You chose ${languageChoice} as your language.`);
  console.log(`You chose ${dbChoice} as your database.`);

  if (languageChoice === 'JavaScript' && dbChoice === 'MongoDB') {
    jsMongoTemplate(targetPath)//call backend project setup function
  } else if (languageChoice === 'JavaScript' && dbChoice === 'PostgreSQL') {
    jsPsqlTemplate(targetPath);
    console.log(`\n\n✅ Backend setup complete!\nHappy Coding`);
  } else if (languageChoice === 'TypeScript' && dbChoice === 'MongoDB') {
    tsMogoTemplate(targetPath);
    console.log(`\n\n✅ Backend setup complete!\nHappy Coding`);
  } else if (languageChoice === 'TypeScript' && dbChoice === 'PostgreSQL') {
    tsPsqlTemplate(targetPath);
  } else {
    console.log(`\n\n✅ Sorry. please connect to our team.`);
  }
}


getUserPreferences(targetPath);

function jsMongoTemplate(targetPath) {
  // Step 3: Define the folder structure and files to create
  const subFolders = ['controllers', 'models', 'routes', 'config', 'middleware', 'utils'];

  const files = {
    'index.js': `const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/routes');
    
dotenv.config();
const PORT = process.env.PORT || 7000;
    
const app = express();
app.use(express.json());
app.use(process.env.API_V || '', router);
    
    
app.listen(PORT, () => console.log('Server running on port ' + PORT));`,
    'routes/routes.js': `const router = require('express').Router();


router.get('/', (_, res) => res.json({ success: true, msg: 'Server is up', result: [] }));
    
module.exports = router;`,
  };

  const rootFiles = {
    'package.json': JSON.stringify({
      "name": folderName,
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node src/index.js",
        "dev": "nodemon src/index.js"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "dotenv": "^16.4.5",
        "express": "^4.21.1"
      },
      "devDependencies": {
        "nodemon": "^3.1.7"
      },
    }, null, 2),
    '.gitignore': 'node_modules\n.env',
    '.env': 'PORT = \nDB_URL = \nJWT_SECRET = \n',
    '.env.example': 'PORT = ',
    'README.md': `
# Simple Express Backend Template

This is a simple template for setting up an Express.js backend with environment variable support using \`dotenv\`, and automatic server restart during development using \`nodemon\`.

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [npm](https://npmjs.com/) (Node Package Manager)

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

Clone the repository to your local machine:

\`\`\`
git clone <repository-url>
cd <repository-folder>
\`\`\`

### 2. Install Dependencies

Run the following command to install all required dependencies:

This will install:

\`\`\`
npm install
\`\`\`

\`express\` - for setting up the backend server  
\`dotenv\` - to load environment variables from \`.env\` file  
\`nodemon\` - for automatically restarting the server during development  

### 3. Setup Environment Variables

Create a \`.env\` file in the root of your project. This file will hold any environment variables that your app needs.

Example \`.env\` file:

\`\`\`
PORT=3000
\`\`\`

You can add any other environment variables here as needed.

### 4. Start the Development Server

Once the dependencies are installed, run the following command to start the server in development mode:

\`\`\`
npm run dev
\`\`\`

This will start the server using \`nodemon\`, which will watch for file changes and restart the server automatically.

### 5. Open Your Project in the Browser

By default, the app will be accessible at:

\`\`\`
http://localhost:3000
\`\`\`

If you've changed the \`PORT\` in the \`.env\` file, make sure to open the server at the correct port.

## Code Structure

\`\`\`
/<root-folder>
├── /node_modules/      # Project dependencies
├── /src/               # Source code files
│   ├── /controllers/   # Controllers for handling requests
│   ├── /routes/        # Express routes
│   ├── /middlewares/   # Express middleware (e.g., authentication, logging)
│   └── app.js          # Main application setup and server
├── .env                # Environment variables
├── .gitignore          # Ignore node_modules and other unnecessary files from git
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Locked dependencies for reproducible installs
└── README.md           # This file
\`\`\`

## Example Code

### 1. \`src/app.js\` (Main Entry Point)

\`\`\`javascript
const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

// Middleware for parsing JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start server on specified port from .env
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});
\`\`\`

### 2. \`package.json\` (Scripts)

\`\`\`json
{
  "name": "express-backend-template",
  "version": "1.0.0",
  "description": "A simple backend template using Express, dotenv, and nodemon.",
  "main": "src/app.js",
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js"
  },
  "dependencies": {
    "express": "^4.18.1",
    "dotenv": "^10.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  },
  "author": "",
  "license": "ISC"
}
\`\`\`

### 3. \`.gitignore\`

\`\`\`
node_modules/
.env
\`\`\`

## Troubleshooting

- If the server doesn't start, check that you have all required dependencies installed with \`npm install\`.
- Make sure your \`.env\` file is properly formatted and contains necessary variables (like \`PORT\`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

With this setup, you have a simple and flexible Express.js backend template ready to be used in your development environment.
`,
  };

  for (const [file, content] of Object.entries(rootFiles)) {
    const filePath = path.join(targetPath, file);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${file}`);
  }

  // Step 4: Create the folders and files inside the specified folder
  const srcPath = path.join(targetPath, 'src');
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath);
    console.log(`Created sub-folder: ${'src'}`);
  };

  subFolders.forEach(folder => {
    const folderPath = path.join(srcPath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Created sub-folder: src/${folder}`);
    }
  });

  for (const [file, content] of Object.entries(files)) {
    const filePath = path.join(srcPath, file);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${file}`);
  }


  console.log(`\n\n✅ Backend setup complete!\nHappy Coding`);

  // Run the command
  const command = spawn('sh', ['-c', `cd ${folderName}&& npm install && npm run dev`]);

  console.log(`\nrunning cd ${folderName}&& npm install && npm run dev`)
  // Output handling
  command.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  command.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  command.on('close', (code) => {
    console.log(`Command exited with code ${code}`);
  });
}

function tsPsqlTemplate(targetPath) {
  console.log(`Currently we are working on, coming soon, `);
}

function jsPsqlTemplate(targetPath) {
  console.log(`Currently we are working on, coming soon`);
}

function tsMogoTemplate(targetPath) {
  const rootFolder = ['nignx', 'script', 'src', 'test'];
  const srcSubFolder = ['config', 'controllers', 'middleware', 'model', 'router', 'types', 'utils'];
  function generatePassword() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    
    let password = '';
    
    // Add the first 12 alphabetic characters
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      password += alphabet[randomIndex];
    }
  
    // Add the remaining 8 characters from the full set
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }
  
    return password;
  }
  
  const apiToken = generatePassword();
  console.log(`\n\n\nYour API Token :- ${apiToken}\n\n\n`);

  rootFolder.forEach(folder => {
    const srcPath = path.join(targetPath, folder);
    if (!fs.existsSync(srcPath)) {
      fs.mkdirSync(srcPath);
      console.log(`Created folder: ${folder}`);
    };
  });


  const rootFiles = {
    'package.json': JSON.stringify({
      "name": folderName,
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "build": "npx tsc",
        "start:dev": "nodemon src/index.ts",
        "start": "npm run \"build\" && node dist/index.js"
      },
      "keywords": [],
      "author": "",
      "license": "",
      "description": "",
      "dependencies": {
        "@types/morgan": "^1.9.9",
        "bcrypt": "^5.1.1",
        "chalk": "^4.1.2",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.21.0",
        "helmet": "^7.1.0",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^8.6.3",
        "morgan": "^1.10.0",
        "winston": "^3.14.2"
      },
      "devDependencies": {
        "@types/bcrypt": "^5.0.2",
        "@types/cors": "^2.8.17",
        "@types/express": "^4.17.21",
        "@types/jsonwebtoken": "^9.0.7",
        "@types/node": "^22.5.5",
        "ts-node": "^10.9.2",
        "nodemon": "^3.1.7",
      }
    }, null, 2),
    '.gitignore': 'node_modules\n.env',
    '.env': `# General \nNODE_ENV = 'dev' \nPORT = 5000\nAPI_V = '/api/v1' \n# Database \nDB_URL = '' \n# API access token \nAPI_TOKEN = "${apiToken}" \n# JWT secret \nJWT_SECRET = '' \nJWT_EXPIRATION_TIME = ''`,
    '.env.example': `# General \nNODE_ENV = 'dev' \nPORT = 5000\nAPI_V = '/api/v1' \n# Database \nDB_URL = '' \n# API access token \nAPI_TOKEN = "${apiToken}" \n# JWT secret \nJWT_SECRET = '' \nJWT_EXPIRATION_TIME = ''`,
    'LICENSE': '',
    'ecosystem.js': '',
    'tsconfig.json': `{
      "compilerOptions": {
        "target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
        "module": "commonjs", /* Specify what module code is generated. */
        "rootDir": "./src/", /* Specify the root folder within your source files. */
        "outDir": "./dist", /* Specify an output folder for all emitted files. */
        "removeComments": true, /* Disable emitting comments. */
        "esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
        "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
        "strict": true, /* Enable all strict type-checking options. */
        "skipLibCheck": true /* Skip type checking all .d.ts files. */
      },
      "include": [
        "src/**/*"
      ],
      "exclude": [
        "./dist"
      ]
    }`,
    'nodemon.json': `{
"ext": ".ts",
"ignore": [
  "dist",
  "node_modules"
]
}`,
    'README.md': `
# Simple Express Backend Template

This is a simple template for setting up an Express.js backend with environment variable support using \`dotenv\`, and automatic server restart during development using \`nodemon\`.

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [npm](https://npmjs.com/) (Node Package Manager)

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

Clone the repository to your local machine:

\`\`\`
git clone <repository-url>
cd <repository-folder>
\`\`\`

### 2. Install Dependencies

Run the following command to install all required dependencies:

This will install:

\`\`\`
npm install
\`\`\`

\`express\` - for setting up the backend server  
\`dotenv\` - to load environment variables from \`.env\` file  
\`nodemon\` - for automatically restarting the server during development  

### 3. Setup Environment Variables

Create a \`.env\` file in the root of your project. This file will hold any environment variables that your app needs.

Example \`.env\` file:

\`\`\`
PORT=5000
\`\`\`

You can add any other environment variables here as needed.

### 4. Start the Development Server

Once the dependencies are installed, run the following command to start the server in development mode:

\`\`\`
npm run dev
\`\`\`

This will start the server using \`nodemon\`, which will watch for file changes and restart the server automatically.

### 5. Open Your Project in the Browser

By default, the app will be accessible at:

\`\`\`
http://localhost:5000
\`\`\`

If you've changed the \`PORT\` in the \`.env\` file, make sure to open the server at the correct port.

## Code Structure

\`\`\`
/<root-folder>
├── /node_modules/      # Project dependencies
├── /src/               # Source code files
│   ├── /controllers/   # Controllers for handling requests
│   ├── /routes/        # Express routes
│   ├── /middlewares/   # Express middleware (e.g., authentication, logging)
│   └── app.js          # Main application setup and server
├── .env                # Environment variables
├── .gitignore          # Ignore node_modules and other unnecessary files from git
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Locked dependencies for reproducible installs
└── README.md           # This file
\`\`\`

## Example Code

### 1. \`src/app.js\` (Main Entry Point)

\`\`\`javascript
const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

// Middleware for parsing JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start server on specified port from .env
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});
\`\`\`

### 2. \`package.json\` (Scripts)

\`\`\`json
{
  "name": "express-backend-template",
  "version": "1.0.0",
  "description": "A simple backend template using Express, dotenv, and nodemon.",
  "main": "src/app.js",
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js"
  },
  "dependencies": {
    "express": "^4.18.1",
    "dotenv": "^10.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  },
  "author": "",
  "license": "ISC"
}
\`\`\`

### 3. \`.gitignore\`

\`\`\`
node_modules/
.env
\`\`\`

## Troubleshooting

- If the server doesn't start, check that you have all required dependencies installed with \`npm install\`.
- Make sure your \`.env\` file is properly formatted and contains necessary variables (like \`PORT\`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

With this setup, you have a simple and flexible Express.js backend template ready to be used in your development environment.
`,
  };

  const subFiles = {
    "config/databaseConnection.ts": `
import mongoose from "mongoose";
import logger from "../utils/logger";
import ENV from "./env";

const moduleName = "[ CONNECTION ]:";

export const connection = async () => {
    try {
        //await mongoose.connect(ENV.DB_URL as string);
        logger.info(\`\${moduleName} Need DB URL\`);
        logger.info(\`\${moduleName} connection established\`);// un-command the code once u have DB URL
    } catch (error: any) {
        logger.error(\`\${moduleName} Error connecting to MongoDB \${error.message}\`);
    }
};
    `,
    'config/env.ts': `import dotenv from 'dotenv';
dotenv.config();

const ENV = {
    NODE_ENV:process.env.NODE_ENV,
    PORT:process.env.PORT,
    API_V:process.env.API_V,
    API_TOKEN:process.env.API_TOKEN,
    DB_URL:process.env.DB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRATION_TIME:process.env.JWT_EXPIRATION_TIME
}

export default ENV;`,
    'config/morgan.ts': `import morgan from 'morgan';
import chalk from 'chalk';

export const logsMiddelware = morgan((tokens, req, res) => {
    return [
        chalk.hex('#f78fb3').italic('@' + tokens.date(req, res, 'iso')),
        chalk.hex('#34ace0').italic(tokens.method(req, res)),
        chalk.hex('#ffb142').italic(tokens.status(req, res)),
        chalk.hex('#2ed573').italic(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#ff5252').italic(tokens.url(req, res)),
        // chalk.yellow(tokens['remote-addr'](req, res)),
        // chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
        // chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
    ].join(' ');
});`,
    'controllers/health.ts': `import { Request, Response } from "express";
import os from 'os';
import httpResponse from "../utils/httpRespons";
import httpErrorResponse from "../utils/httpError";
import logger from "../utils/logger";

const moduleName = '[ HEALTH CONTROLLER ]:'

export const healthCheck = (req: Request, res: Response) => {
    try {
        const data = {
            env: process.env.NODE_ENV,
            pid: process.pid,
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            nodeVersion: process.versions.node,
            platform: os.platform(),
            uptime: \`\${process.uptime().toFixed(2)} sec\`,
            totalCup: os.cpus().length,
            memory: {
                totalMemory: \`\${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`,
                freeMemory: \`\${(os.freemem() / 1024 / 1024).toFixed(2)} MB\`,
                used: \`\${((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2)} MB\`,
                heapTotal: \`\${((process.memoryUsage().heapTotal) / 1024 / 1024).toFixed(2)} MB\`,
                heapUsed: \`\${((process.memoryUsage().heapUsed) / 1024 / 1024).toFixed(2)} MB\`
            }
        }
        httpResponse(res, 200, 'Server is running', data);
    } catch (error: any) {
        logger.error(\`\${moduleName} Error in healthcheck| \${error}\`);
        httpErrorResponse(res, error.message);
    }
}`,
    'middleware/apiAuth.ts': `import { NextFunction, Request, Response } from "express";
import httpErrorResponse from "../utils/httpError";
import httpResponse from "../utils/httpRespons";
import ENV from "../config/env";
import logger from "../utils/logger";
const moduleName = '[ API AUTH MIDDLEWARE ]:';

export const apiAuth = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers["api-token"];
        if (!token) return httpResponse(res, 401, "Access Denied");

        if (token !== ENV.API_TOKEN) return httpResponse(res, 401, "Access Denied or invalid token.");

        next();

    } catch (error: any) {
        logger.error(\`\${moduleName} | \${JSON.stringify(error)}\`);
        httpErrorResponse(res, error.message);
    }
}
`,
    'model/users.ts': `import mongoose from "mongoose";

const userdSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.SchemaTypes.ObjectId, ref: 'roles' },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false,
});

export const Users = mongoose.model('users', userdSchema);`,
    'router/index.ts': `import { Router } from "express";
import { healthCheck } from "../controllers/health";

const router = Router();

// routes
router.get('/health', healthCheck);

export default router;`,
    'utils/httpError.ts': `import { Request, Response } from 'express';

const httpErrorResponse = (res: Response, error: unknown = [], msg: string = 'Internal Server Error') => {
    const response = {
        statusCode: 500,
        msg,
        result: [],
        error: error
    };
    res.status(500).json(response);
};

export default httpErrorResponse;`,
    'utils/httpRespons.ts': `import { Request, Response } from 'express';

const httpResponse = (res: Response, statusCode: number, msg: string, data: unknown = []) => {
    const response = {
        statusCode,
        msg,
        result: data
    };
    res.status(statusCode).json(response);
};

export default httpResponse;
`,
    'utils/logger.ts': `import { createLogger, format, transports, addColors } from 'winston';
import ENV from '../config/env';
const { combine, colorize, timestamp, printf } = format;
const isProduction = ENV.NODE_ENV === 'production';

interface LogInfo {
    level: string;
    message: string;
    label?: string;
    timestamp?: string;
}

// Custom colors for different log levels
export const LOGGER_MSG_COLORS = {
    error: "bold red",
    warn: "italic yellow",
    info: "cyan",
};

// Adding custom colors to Winston
addColors(LOGGER_MSG_COLORS);

const customFormat = combine(
    colorize({ all: true }),
    timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    printf((info: any) => {
        return \`[\${info.timestamp}]: \${info.level} \${info.message}\`;
    })
);

const logger = createLogger({
    level: isProduction ? 'error' : 'info',
    transports: [
        new transports.Console({ format: customFormat }),
    ],
});

export default logger;`,
    'index.ts': `import express, { Application, Request, Response } from 'express';
import helmet from "helmet";
import cors from 'cors';
import ENV from './config/env';
import router from './router';
import httpResponse from './utils/httpRespons';
import { logsMiddelware } from './config/morgan';
import logger from './utils/logger';
import { apiAuth } from './middleware/apiAuth';
import { connection } from './config/databaseConnection';
const moduleName = '[ SERVER ]:';

const app: Application = express();

// middlewares
app.use(helmet());
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ['*']
}));
app.use(express.json());
app.use(logsMiddelware);

// Database configuration
connection();

// routes
app.use(ENV.API_V as string, apiAuth, router);
app.use('*', apiAuth, (req: Request, res: Response) =>
    httpResponse(res, 404, \`\${req.originalUrl} Not Found\`)
);

app.listen(ENV.PORT, () => {
    logger.info(\`\${moduleName} - Server running in \${ENV.NODE_ENV} mode on port \${ENV.PORT}\`);
    logger.warn(\`\${moduleName} - IMPORTANT: Your API token is \${ENV.API_TOKEN}\`);
    logger.warn(\`\${moduleName} - Please include this token in the header before making any API calls ex:- { api-token: \${ENV.API_TOKEN}\}.\`);
    logger.warn(\`\${moduleName} - You can check the server health at http://localhost:\${ENV.PORT}/api/v1/health\`);
});`
  }

  for (const [file, content] of Object.entries(rootFiles)) {
    const filePath = path.join(targetPath, file);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${file}`);
  }

  const srcPath = path.join(targetPath, 'src');
  srcSubFolder.forEach(folder => {
    const subFolderpath = path.join(srcPath, folder);
    if (!fs.existsSync(subFolderpath)) {
      fs.mkdirSync(subFolderpath);
      console.log(`Created sub-folder: src/${folder}`);
    };
  })


  for (const [file, content] of Object.entries(subFiles)) {
    const filePath = path.join(srcPath, file);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${file}`);
  }
  console.log(`\n\n✅ Backend setup complete!\nHappy Coding`);

  // Run the command
  const command = spawn('sh', ['-c', `cd ${folderName} && npm install && npm run start:dev`]);

  console.log(`\nrunning cd ${folderName} && npm install && npm run start:dev`)
  // Output handling
  command.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  command.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  command.on('close', (code) => {
    console.log(`Command exited with code ${code}`);
  });
}