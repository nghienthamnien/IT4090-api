require('dotenv').config();
const process = require('process');
const logger = require('../util/logger');

module.exports = {
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '123456789',
    database: process.env.DATABASE_NAME || 'clothing_store',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || 3306,
    dialect: 'mysql',
    define: {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    timezone: '+07:00',
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
