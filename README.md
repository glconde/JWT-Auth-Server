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
- Ensure MongoDB is running locally on port `27017`, or update the `MONGO_URI` accordingly.
- Replace `DB`, `COLLECTION`, and `PORT` accordingly. `PORT` pertains to the server port, not MongoDB.

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

### Update User

**PUT** `/user/:id`

#### Headers

```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

#### Request Body (JSON)

```json
{
  "username": "newusername",
  "password": "newpassword"
}
```

#### Response (Success)

```json
{
  "message": "User updated successfully"
}
```

### Delete User

**DELETE** `/user/:id`

#### Headers

```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

#### Response (Success)

```json
{
  "message": "User deleted successfully"
}
```

## Using Postman for API Requests

### 1. Register a User

- Open Postman.
- Set the request type to `POST`.
- Enter `http://localhost:3000/register` as the request URL.
- Go to the `Body` tab, select `raw`, and choose `JSON` format.
- Enter the following JSON:

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

- Click `Send`.
- You should receive a success message.

### 2. Login a User

- Open Postman.
- Set the request type to `POST`.
- Enter `http://localhost:3000/login` as the request URL.
- Go to the `Body` tab, select `raw`, and choose `JSON` format.
- Enter the following JSON:

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

- Click `Send`.
- You should receive a token in the response.

### 3. Update a User

- Open Postman.
- Set the request type to `PUT`.
- Enter `http://localhost:3000/user/:id` as the request URL (replace `:id` with the actual user ID).
- Go to the `Headers` tab and add `Authorization: Bearer your_jwt_token`.
- Go to the `Body` tab, select `raw`, and choose `JSON` format.
- Enter the following JSON:

```json
{
  "username": "newusername",
  "password": "newpassword"
}
```

- Click `Send`.
- You should receive a success message.

### 4. Delete a User

- Open Postman.
- Set the request type to `DELETE`.
- Enter `http://localhost:3000/user/:id` as the request URL (replace `:id` with the actual user ID).
- Go to the `Headers` tab and add `Authorization: Bearer your_jwt_token`.
- Click `Send`.
- You should receive a success message.

## Troubleshooting

### 1. MongoDB Connection Issues

Ensure MongoDB is running and the connection string is correct in `.env`. You can check the connection using:

```bash
mongosh
```

If using MongoDB Compass, verify the database `cprg303` or registered DB name exists.

## License

This project is for educational purposes only.
