import { pool } from "../db.js";

export const ping = async (req, res) => {
  const [result] = await pool.query("SELECT 1+1 AS result");
  res.json(result);
};

export const getIndexPage = (req, res) => {
  res.send("Hello world");
};

export const getRegister = (req, res) => {
  res.send("Register page");
};

export const createUser = async (req, res) => {
  const newUser = req.body;
  if (!validateUser(newUser)) {
    return res.send("the user data are not correct");
  }
  await pool.query("INSERT INTO users (mail, password) VALUES (?,?)", [
    newUser.mail,
    newUser.password,
  ]);
  res.sendStatus(204);
};

function validateUser(user) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(user.mail) || user.password.length < 4) {
    return false;
  }

  return true;
}
