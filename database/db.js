const knex = require("knex");

const knexfile = require("./knexfile");

const env = process.env.NODE_ENV || "development";
const configOptions = knexfile[env];

module.exports = knex(configOptions);

// create table users (id int unique primary key, username varchar(255), password_digest TEXT)
// create table scores (username varchar(255) UNIQUE, games_won int, foreign key (username) references users(username))

