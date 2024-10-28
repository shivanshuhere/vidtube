import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config({
  path: "src/.env",
});

//common middlewares
app.use(
  cors({
    origin: process.env.ORIGIN,
    Credential: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//import routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";

// routes
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/user", userRouter);

export { app };
