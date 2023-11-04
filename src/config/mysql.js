require('dotenv').config();
const process = require('process');
const logger = require('../util/logger');

module.exports = {
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '123456789',
    database: 'clothing_store',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: false,
    },
    logging: (msg) => logger.debug(msg),
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
    },
    seederStorage: 'json',
    seederStoragePath: 'sequelizeData.json',
    migrationStorage: 'json',
    migrationStoragePath: 'sequelizeMeta.json',
};
