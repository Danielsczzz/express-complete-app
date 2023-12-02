// Imports
import express from "express";
import morgan from "morgan";
import { indexRouter } from "./routes/index.routes.js";
import { appRouter } from "./routes/app.routes.js";

const app = express();

// app settings
app.set("appName", "express-complete-app");
app.set("port", 4000);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(indexRouter);
app.use(appRouter);

app.listen(app.get("port"));
console.log(
  `Server ${app.get("appName")} listening on port: ${app.get("port")}`
);
