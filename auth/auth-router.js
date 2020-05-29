const router = require('express').Router()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userDB = require("./auth-model");
const generateToken = require("./tokenGen");
const validateUser = require('../middleware/middleware')