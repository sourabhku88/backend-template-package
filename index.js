#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Step 1: Get the folder name from the command-line arguments
const folderName = process.argv[2]; // The second argument is the folder name
if (!folderName) {
  console.error("❌ Error: Please specify a folder name.");
  console.log("Usage: npx basic-backend-by-sourabh <folder-name>");
  process.exit(1);
}

// Step 2: Create the specified folder
let targetPath = path.join(process.cwd(), folderName);
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath);
  console.log(` Created folder: ${folderName}`);
} else {
  console.error(`❌ Error: Folder '${folderName}' already exists.`);
  process.exit(1);
}

// Step 3: Define the folder structure and files to create
// const folders = ['src', 'controllers', 'models', 'routes', 'config', 'middleware','utils'];
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