import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./dbconfig/dbConfig";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 8000;

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

// ✅ Routes
app.use("/", userRoutes);

// ✅ DB connect + server start
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
  });