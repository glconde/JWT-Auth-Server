require("dotenv").config();
// glc 2025

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
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { collection: process.env.COLLECTION }
);
const User = mongoose.model("Credential", CredentialSchema);

// jwt
const JWT_SECRET = process.env.JWT_SECRET;

// authenticate
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// sign-up
app.post("/register", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Login attempt: ${username} on ${new Date().toISOString()}`);

    // user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

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
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// update user password
app.put("/user/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// delete user
app.delete("/user/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
