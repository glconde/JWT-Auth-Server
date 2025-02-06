# Server Setup Guide

## Prerequisites

Before running the server, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Installed and running locally or hosted on a cloud service like MongoDB Atlas)
- [Postman](https://www.postman.com/) (Optional, for testing API requests)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/glconde/CPRG303-Assignment2-Auth.git
cd CPRG303-Assignment2-Auth
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root and add the following:

```
MONGO_URI=mongodb://localhost:27017/cprg303
JWT_SECRET=your_secret_key
DB=CPRG303
COLLECTION=credentials
PORT=3000
```

- Replace `your_secret_key` with a strong secret key.
- Ensure MongoDB is running locally on port `27017`, or update the `MONGO_URI` accordingly.\
- Replace DB, COLLECTION and PORT accordingly. PORT pertains to server port not MongoDB.

### 4. Start the Server

```bash
node server.js
```

If you prefer automatic restart on changes, install `nodemon` and run:

```bash
npm install -g nodemon
nodemon server.js
```

## API Endpoints

### Register User

**POST** `/register`

#### Request Body (JSON)

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

#### Response (Success)

```json
{
  "message": "User registered successfully"
}
```

### Login User

**POST** `/login`

#### Request Body (JSON)

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

#### Response (Success)

```json
{
  "token": "your_jwt_token"
}
```

## Troubleshooting

### 1. MongoDB Connection Issues

Ensure MongoDB is running and the connection string is correct in `.env`. You can check the connection using:

```bash
mongosh
```

If using MongoDB Compass, verify the database `cprg303` or registered DB name exists.

## License

This project is for educational purposes only.
