import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "ClipSync API is running 🚀",
  });
});

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`ClipSync API running on port ${PORT}`);
  });
};

startServer();