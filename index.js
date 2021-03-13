"use strict";

require("dotenv").config();

import express from "express";
import router from "./src/router";
import errorHandler from "./src/middleware/errorHandler";
import cors from "cors";

const app = express();

app.use(cors());

// allows us to parse json
app.use(express.json());

//using the router.js file
app.use(router);

//add errorHandler after routes
app.use(errorHandler);

app.listen(`${process.env.PORT}`, () =>
  console.log(`API server ready on http://localhost:${process.env.PORT}`)
);