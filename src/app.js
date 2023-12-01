// Imports
import express from "express";
import morgan from "morgan";
import { router } from "./routes/routes.js";
import { pool } from "./db.js";

const app = express();

// app settings
app.set("appName", "express-complete-app");
app.set("port", 4000);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

// Test routes
app.get("/ping", async (req, res) => {
  const [result] = await pool.query("SELECT 1+1 AS result");
  res.json(result);
});

app.listen(app.get("port"));
console.log(
  `Server ${app.get("appName")} listening on port: ${app.get("port")}`
);
