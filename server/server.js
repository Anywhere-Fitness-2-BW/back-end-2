const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRouter = require("../users/usersRouter");
const authRouter = require("../auth/auth-router");
const classesRouter = require("../classes/classesRouter");
const clientRouter = require('../auth/client-router');
const restricted = require("../auth/restricted-middleware");
const instructor = require("../auth/instructor-only");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/users", restricted, instructor, usersRouter);
server.use("/auth", authRouter);
server.use("/classes", classesRouter);
server.use('/clients', clientRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: 'API up and running' });
});

module.exports = server;