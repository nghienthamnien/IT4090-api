require('dotenv').config();
const process = require('process');

const config = {};

config.projectName = 'IT4090-api';
config.baseURL = '/api/v1';

config.express = {
    port: process.env.PORT || 8080,
};

config.jwt = {
    secretKey: process.env.SECRET_KEY || 'this-is-secret-key',
    accessTokenExpireIn: process.env.ACCESS_TOKEN_EXPIRED_IN || '5m',
    refreshTokenExpireIn: process.env.REFRESH_TOKEN_EXPIRED_IN || '24h',
    algorithm: 'HS256',
};

config.hash = {
    saltRounds: process.env.SALT_ROUND || 10,
};

config.mailer = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kelton.jacobs@ethereal.email',
        pass: 'YE7Sa3nprYhVErcgGs',
    },
};

config.logger = { level: process.env.LOGGER_LEVEL || 'info' };

module.exports = config;
