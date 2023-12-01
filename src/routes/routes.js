import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.get("/register", (req, res) => {
  res.send("Register page");
});

router.post("/register", (req, res) => {
  const newUser = req.body;
  res.json(newUser);
});
