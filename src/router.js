"use strict";

require("dotenv").config();

import express from "express";
import auth from "../data/auth.json";
import { v4 as uuidv4 } from "uuid";
import verifyToken from "./middleware/jwtVerify";
import { readUsers, writeUsers } from "./util/jsonHandler";

const router = express.Router();
let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//testing route - hello world
router.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

router.get("/users", verifyToken, (req, res) => {
  readUsers().then((users) => {
    return res.status(200).send(cats);
  });
});


router.post("/contact_form/entries", (req, res) => {
  let newUser = {
    id: uuidv4(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    message: req.body.message
  };
  readUsers().then((usersArray) => {
    usersArray.push(newUser);
    writeUsers(usersArray);
    return res.status(201).send(newUser);
  });
});

router.post("/auth", (req, res) => {
  let newAuth = {
    email: req.body.email,
    password: req.body.password,
  };

  bcrypt.hash(newAuth.password, saltRounds, function (err, hash) {
    newAuth.password = hash;

    let token = jwt.sign(newAuth, `${process.env.privateKey}`);
    auth.push(newAuth);
    console.log(newAuth);
    return res.status(201).send(token);
  });
});


router.get("*", (req, res, next) => {
  let err = new Error(`typed wrong URL`);
  next(err);
});

export default router;