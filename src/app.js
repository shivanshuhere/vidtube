import express from "express";
import env from "dotenv";
import cors from "cors";

const app = express();

env.config({
  path: "./.env",
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

export { app };
