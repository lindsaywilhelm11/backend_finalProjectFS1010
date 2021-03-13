"use strict";

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(404).send({ message: "not found" });
}

export default errorHandler;