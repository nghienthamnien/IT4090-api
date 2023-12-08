const { APIError } = require('../util/common');
const logger = require('../util/logger');

module.exports = (err, req, res, next) => {
    logger.error('Internal Server error', err);
    res.status(500).json(APIError('Internal server error'));
};
