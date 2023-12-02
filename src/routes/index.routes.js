import { Router } from "express";
import controllers from "../controllers/controllers.js";

export const indexRouter = Router();

// Test route
indexRouter.get("/ping", controllers.ping);

indexRouter.get("/", controllers.getIndexPage);

indexRouter.get("/register", controllers.getRegister);

indexRouter.post("/register", controllers.createUser);

indexRouter.get("/login", controllers.getLogin);

indexRouter.post("/login", controllers.verifyUser);
