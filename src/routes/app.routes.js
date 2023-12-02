import { Router } from "express";
import controllers from "../controllers/controllers.js";

export const appRouter = Router();

appRouter.all("/mainPage", controllers.getMainPage);
