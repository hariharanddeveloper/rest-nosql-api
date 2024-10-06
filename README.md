# Node.js REST API by final-api-cli

This project is a robust RESTful API developed using Node.js, Express, and Mongoose ORM. It is structured following best practices, includes comprehensive testing, and is fully containerized using Docker for seamless deployment and runtime management, The API built by final-api-cli.

## Installation

### Configure Environment Variables

Create a .env file in the root directory of your project. Use the .env.example file as a reference to define your environment variables.

## API Endpoints

### Health check

**GET** : `/api/health` - check the health status of the API.

### File Operations

**POST** : `/api/upload` - upload a file to the Server.

**GET** : `/api/download/:filename` - download a file from the Server.

### User Management

**GET** : `/api/users` - get the list of the all users.

**GET** : `/api/users/:id` - get a specific user.

**POST** : `/api/users` - create a new user.

**PUT** : `/api/users/:id` - update an existing user information.

**DELETE** : `/api/users/:id` - remove a user.

## API Scripts

### Run the API

```bash
npm start
```

### Test the API

```bash
npm test
```

### Run the API with pm2

```bash
npm run pm2
```

## Docker Setup

To build and run the application in a Docker container:

### 1 : Build the Docker image:

```bash
docker build -t rest-nosql-api-image .
```

### 2 : Run the Docker container:

```bash
docker run -p 3000:3000 --name rest-nosql-api-container rest-nosql-api-image
```
