"use strict";

require("dotenv").config();

// None of these need to be npm installed as they come with Node.js.
import util from "util";
import fs from "fs";
import path from "path";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const usersPath = path.resolve(`${process.env.DATAROUTE2}`);

async function readUsers() {
  const json = await readFile(usersPath);
  return JSON.parse(json);
}

async function writeUsers(user) {
  const json = JSON.stringify(user);
  return writeFile(usersPath, json);
}

export { readUsers, writeUsers };