// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const logger = require('../util/logger');

const morganMiddleware = morgan(
    '[:method] :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            write: (message) => logger.http(message),
        },
    },
);

module.exports = morganMiddleware;
