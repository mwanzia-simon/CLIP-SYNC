import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);

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
