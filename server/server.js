const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

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