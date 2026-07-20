import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/
console.log("CLIENT_URL =", process.env.CLIENT_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "College Website API Running 🚀",
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api", routes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);

export default app;