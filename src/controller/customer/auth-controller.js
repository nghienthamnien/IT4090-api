const { v4: uuidv4 } = require('uuid');
const UserService = require('../../service/customer/auth-service');
const STATUS_CODES = require('../../constant/status-code');
const { APIError, APISuccess } = require('../../util/common');
const logger = require('../../util/logger');

module.exports = {
    async signup(req, res, next) {
        const { name, email, phone_number, password } = req.body;
        const uuid = uuidv4();
        try {
            // sign up
            const { err, result } = await UserService.signup({
                uuid,
                name,
                email,
                phone_number,
                password,
            });
            if (err) {
                logger.error(err.name, err.msg, {
                    uuid,
                    name,
                    email,
                    phone_number,
                    password,
                });
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }

            return res
                .status(result.statusCode)
                .json(APISuccess(result.msg, result.data));
        } catch (error) {
            return next(error);
        }
    },

    async login(req, res, next) {
        const { username, password } = req.body;

        // validate
        if (!username || !password) {
            logger.info('Invalid data', { username, password });
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json(APIError('Bad request'));
        }

        // login
        try {
            const { err, result } = await UserService.login({
                username,
                password,
            });
            if (err) {
                logger.info(err.name, { username, password });
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }
            const { accessToken, userInfo } = result.data;

            return res.status(result.statusCode).json(
                APISuccess(result.msg, {
                    accessToken: `Bearer ${accessToken}`,
                    userInfo,
                }),
            );
        } catch (error) {
            return next(error);
        }
    },
};
