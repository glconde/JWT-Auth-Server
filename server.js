require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// express & json parsing
const app = express();
app.use(express.json());

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB Connected! Database: ${process.env.DB}`))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// db schema
const CredentialSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { collection: process.env.COLLECTION }
);
const User = mongoose.model("Credential", CredentialSchema);

// jwt
const JWT_SECRET = process.env.JWT_SECRET;

// sign-up
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // user exists
  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create and add
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});

// login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // login attempt
  console.log(`login attempt: ${username} on ${new Date().toISOString()}`);

  // user exists
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // username and password mismatch
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // log success
  console.log(
    `User ${username} logged in successfully at ${new Date().toISOString()}`
  );

  // JWT token
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
