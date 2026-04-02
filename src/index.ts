import express from "express";
import cors from "cors";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Dummy database (temporary)
let users: { name: string; email: string }[] = [];

// ✅ GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// ✅ ADD user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email required" });
  }

  const newUser = { name, email };
  users.push(newUser);

  res.json({
    message: "User added successfully",
    user: newUser,
  });
});

// ✅ Root route (test ke liye)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Server start
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});