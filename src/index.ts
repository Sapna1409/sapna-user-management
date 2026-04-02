import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let users: { name: string; email: string }[] = [];

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email required" });
  }

  const newUser = { name, email };
  users.push(newUser);

  res.json({ message: "User added", user: newUser });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});