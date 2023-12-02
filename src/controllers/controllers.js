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

export const getLogin = (req, res) => {
  res.send("Login page");
};

export const verifyUser = async (req, res) => {
  const user = req.body;
  let [records] = await pool.query(
    "SELECT * FROM users WHERE mail = ? AND password = ?",
    [user.mail, user.password]
  );
  res.redirect(307, "/mainPage?mail=" + records[0].mail);
};

export const getMainPage = (req, res) => {
  const mail = req.query.mail;
  res.send("Hello " + mail);
};

function validateUser(user) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(user.mail) || user.password.length < 4) {
    return false;
  }

  return true;
}

const controllers = {
  ping,
  getIndexPage,
  getRegister,
  createUser,
  getLogin,
  verifyUser,
  getMainPage,
};

export default controllers;
