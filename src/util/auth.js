const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const { secretKey, accessTokenExpireIn, refreshTokenExpireIn, algorithm } =
    require('../config').jwt;
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

    generateToken(payload) {
        logger.debug(payload);
        const accessToken = jwt.sign(payload, secretKey, {
            algorithm,
            expiresIn: accessTokenExpireIn,
        });
        const refreshToken = jwt.sign(payload, secretKey, {
            algorithm,
            expiresIn: refreshTokenExpireIn,
        });
        return { accessToken, refreshToken };
    },

    validateToken(token) {
        const decode = jwt.verify(token, secretKey);
        return decode;
    },
};
