const knex = require('knex');
const knexFile = require('../knexfile');

const environment = process.env.DB_ENV || 'development';

module.exports = knex(knexFile[environment]);