import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./dbconfig/dbConfig";
import { User } from "./entities/User";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// ✅ GET users
app.get("/users", async (req, res) => {
  const repo = AppDataSource.getRepository(User);
  const users = await repo.find();
  res.json(users);
});

// ✅ ADD user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name & Email required" });
  }

  const repo = AppDataSource.getRepository(User);
  const newUser = repo.create({ name, email });
  await repo.save(newUser);

  res.json({ message: "User added", user: newUser });
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Start server AFTER DB connect
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB Error:", error);
  });