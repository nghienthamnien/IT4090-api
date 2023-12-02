const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const { secretKey, algorithm } = require('../config').jwt;
const { saltRounds } = require('../config').hash;

module.exports = {
    async generateHash(plain_password) {
        const password = await bcrypt.hash(plain_password, saltRounds);
        return password;
    },

    async validateHash(plain_password, hash) {
        const match = await bcrypt.compare(plain_password, hash);
        return match;
    },

    generateToken(payload, expiresIn) {
        if (!payload) {
            logger.debug('payload is empty', payload);
            return new Promise((_, reject) => {
                reject(new Error('Payload is empty'));
            });
        }
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                secretKey,
                {
                    algorithm,
                    expiresIn,
                },
                (err, token) => (err ? reject(err) : resolve(token)),
            );
        });
    },

    validateToken(token) {
        if (!token) {
            logger.debug('No token provided', token);
            return new Promise((_, reject) => {
                reject(new Error('No token provided'));
            });
        }
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, { complete: false }, (err, decoded) =>
                err ? reject(err) : resolve(decoded),
            );
        });
    },
};
