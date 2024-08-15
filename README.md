# Dumbflix Backend Deployment Guide

## Introduction

Welcome to the deployment guide for the Dumbflix backend application. This document will guide you through the steps required to set up the database and deploy the backend on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Version 10.x or below. You can download it from [Node.js official website](https://nodejs.org/).
- **PostgreSQL**: Ensure PostgreSQL is installed and running on your machine.

## Step-by-Step Setup

### 1. Setup Database

#### 1.1 Setup Database with Sequelize

Install Sequelize CLI globally if you haven't already:

```bash
npm install --save sequelize-cli -g
Install Sequelize and PostgreSQL dependencies:

npm install --save sequelize pg pg-hstore
1.2 Import Database
Import the provided dumbflix.sql file into your PostgreSQL database. You can do this using a tool like psql or any PostgreSQL client.

2. Deploy Dumbflix Backend
2.1 Install Node.js
Ensure you have Node.js version 10.x or below installed. Verify your Node.js version by running:

node -v
If you do not have the correct version, download and install it from Node.js official website.

2.2 Copy Environment Variables
Copy the example environment variables file to .env:

cp .env.example .env
2.3 Configure Database
Update config/config.json to match your database configuration:

Open config/config.json in your preferred text editor.
Replace the placeholder values with your database configuration.

2.4 Install Dependencies
Install the required dependencies:

npm install
2.5 Migrate Database
Run the database migrations:

npx sequelize db:migrate
2.6 Start the Backend Server
Start the backend server on port 5000:

npm start
This will launch the Dumbflix backend application, and you can access it by navigating to http://localhost:5000 in your web browser.

Happy developing!# backend-dumbflix
