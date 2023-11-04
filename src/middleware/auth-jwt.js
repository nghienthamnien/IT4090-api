const jwt = require('jsonwebtoken');
const STATUS_CODES = require('../constant/status-code');
const { validateToken } = require('../util/auth');
const logger = require('../util/logger');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    logger.debug(authHeader);
    logger.debug(token);
    if (!token)
        return res
            .status(STATUS_CODES.FORBIDDEN)
            .json({ name: 'No token provided' });
    try {
        const decode = await validateToken(token);
        logger.debug(decode);
        req.user = decode;
        return next();
    } catch (error) {
        logger.debug(error);
        if (error instanceof jwt.TokenExpiredError)
            return res
                .status(STATUS_CODES.UN_AUTHORIZED)
                .json({ name: 'Token expired', isExpired: true });
        return res
            .status(STATUS_CODES.UN_AUTHORIZED)
            .json({ name: 'Invalid Token', isExpired: false });
    }
};
