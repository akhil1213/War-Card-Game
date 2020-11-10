// require('dotenv').config();
module.exports = {
    development: {
        client: 'pg',
        connection: "postgres://mgfxtema:ZBCY3WhRvicWWhCgmcMJ1DC5LMOGqfQz@lallah.db.elephantsql.com:5432/mgfxtema"
        , migrations: {
            directory: './data/migrations',
        },
        seeds: { directory: './data/seeds' },
    },

    testing: {
        client: 'pg',
        connection: process.env.DB_URL,
        migrations: {
            directory: './data/migrations',
        },
        seeds: { directory: './data/seeds' },
    },

    production: {
        client: 'pg',
        connection: process.env.DB_URL,
        migrations: {
            directory: './data/migrations',
        },
        seeds: { directory: './data/seeds' },
    },
};