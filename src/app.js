const express = require('express');
const swaggerUI = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./model/mysql');
const { baseURL } = require('./config');
const { port } = require('./config').express;
const Router = require('./routes');
const logger = require('./util/logger');
const morganMiddleware = require('./middleware/morgan');
const errorHandler = require('./middleware/error-handler');

const app = express();

try {
    const docs = yaml.load(fs.readFileSync('src/docs/openapi.yaml', 'utf8'));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
} catch (e) {
    logger.error(e);
}
(async () => {
    logger.info('Starting Server');
    app.use(
        cors({
            origin: 'http://localhost:5173',
            maxAge: 86400000,
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            credentials: true,
        }),
    );
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morganMiddleware);
    app.use(baseURL, Router);
    app.use(errorHandler);
    logger.info('Set up express succesfully');
    try {
        await sequelize.authenticate();
        logger.info('Connection database has been established successfully');
    } catch (error) {
        logger.error('Connect db error', error);
    }
    const server = http.createServer(app);
    server.listen(port, () => {
        logger.info(`Start server successfully on port: ${port}`);
    });
})();
