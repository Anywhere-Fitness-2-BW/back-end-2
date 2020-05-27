const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        {
          username: 'Adam545',
          email: 'Adam@gmail.com',
          password: bcrypt.hashSync('cats101'),
          displayName: 'Adam',
          gender: 'Male'
        },
        {
          username: 'Sunglasswomen',
          email: 'bree@gmail.com',
          password: bcrypt.hashSync('prettylady34'),
          displayName: 'Bree',
          gender: 'Female'
        },
        {
          username: 'atvdude87',
          email: 'dylan@yahoo.com',
          password: bcrypt.hashSync('suzuki92'),
          displayName: 'Dylan',
          gender: 'Male'
        },
        {
          username: 'tepej',
          email: 'jtepe@hotmail.com',
          password: bcrypt.hashSync('lets2it'),
          displayName: 'Jack',
          gender: 'Male'
        }
      ]);
    });
};
