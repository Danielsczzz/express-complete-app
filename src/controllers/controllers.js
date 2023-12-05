import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getIndexPage = (req, res) => {
  res.send("Hello world");
};

export const getRegister = (req, res) => {
  res.send("Register page");
};

export const createUser = async (req, res) => {
  const { mail, password } = req.body;
  const validatorObject = validateUser(mail, password);
  if (!(await validatorObject).validation) {
    return res.status(400).send((await validatorObject).message);
  }
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      mail,
      password: hash,
    },
  });
  res.sendStatus(204);
};

export const getLogin = (req, res) => {
  res.send("Login page");
};

export const verifyUser = async (req, res) => {
  const { mail, password } = req.body;
  const findedUser = await prisma.user.findFirst({
    where: {
      mail,
    },
  });

  if (findedUser === null)
    return res.status(400).send("This mail address are not registered");
  const match = await bcrypt.compare(password, findedUser.password);
  match
    ? res.redirect(307, "/mainPage")
    : res.status(400).send("the password doesn't match");
};

export const getMainPage = (req, res) => {
  res.send("Hello user");
};

async function validateUser(mail, password) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(mail) || password.length < 4) {
    return {
      validation: false,
      message: "Please enter a valid mail or password",
    };
  }

  const findedUser = await prisma.user.findFirst({
    where: {
      mail,
    },
  });

  if (findedUser) {
    return {
      validation: false,
      message: "This mail address is already registered",
    };
  }
  return {
    validation: true,
    message: "This user is valid",
  };
}

const controllers = {
  getIndexPage,
  getRegister,
  createUser,
  getLogin,
  verifyUser,
  getMainPage,
};

export default controllers;
