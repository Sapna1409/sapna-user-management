import express from "express";
import cors from "cors";
import { AppDataSource } from "./dbconfig/dbConfig";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 8000;

// ✅ Middlewares
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ Routes connect
app.use("/", userRoutes);

// ✅ Database connect + server start
AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });