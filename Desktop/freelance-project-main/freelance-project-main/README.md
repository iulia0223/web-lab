Project Setup Guide
This guide provides concise instructions to set up and run both the server and client for the project.

Prerequisites
Ensure you have the following installed:

Node.js (v18.x or higher)

npm

# Navigate to Server Directory

`cd server`

# Install Dependencies

`npm install`

# Configuration

Create a `.env` file in the server directory with the following content:

## DATABASE

`DATABASE_URL=mongodb+srv://root:vQOy0iw5dlNlVX4X@cluster0.2p0okdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

## SESSION

`SESSION_SECRET=adapter`

## JWT

`JWT_SECRET=adapter`

## SERVER

`PORT=5000`

`CORS_ORIGIN=*`

## Start the Server

### For development:

`npm run dev`

For production:

`npm run start`

# Client Setup

Navigate to Client Directory

`cd ../client`

Install Dependencies

`npm install`

# Configuration

Create a .env file in the client directory with the following content:

`.env`

`VITE_SERVER_URL=http://localhost:5000`

Start the Client

# For development:

`npm run dev`

For building the client for production:

`npm run build`

For previewing the production build:

`npm run preview`

Accessing the Application

Server: Runs on http://localhost:5000

Client: Runs on http://localhost:8000

# Environment Variables

## Server

DATABASE_URL: MongoDB connection string.

SESSION_SECRET: Secret key for session management.

JWT_SECRET: Secret key for JWT tokens.

PORT: Server port (default 5000).

CORS_ORIGIN: Allowed origins for CORS.

## Client

VITE_SERVER_URL: URL of the server.
