import { Router } from "express";
import {
  getIndexPage,
  getRegister,
  createUser,
  ping,
  verifyUser,
} from "../controllers/controllers.js";

export const router = Router();

// Test route
router.get("/ping", ping);

router.get("/", getIndexPage);

router.get("/register", getRegister);

router.post("/register", createUser);

router.post("/login", verifyUser);
