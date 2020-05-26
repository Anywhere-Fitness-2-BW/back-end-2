const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server up and running' })
})

module.exports = server;