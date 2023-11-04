const { v4: uuidv4 } = require('uuid');
const AdminAuthService = require('../../service/admin/admin.auth.service');
const adminValidation = require('../../validation/admin-user-validation');
const STATUS_CODES = require('../../constant/status-code');
const { APIError, APISuccess } = require('../../util/common');
const logger = require('../../util/logger');
const { baseURL } = require('../../config');

module.exports = {
    async signup(req, res, next) {
        const { name, email, phone_number, password, role } = req.body;
        const uuid = uuidv4();
        try {
            // validate
            const validationError = await adminValidation({
                uuid,
                name,
                email,
                phone_number,
                password,
                role,
            });
            if (validationError) {
                logger.info(validationError.msg, {
                    uuid,
                    name,
                    email,
                    phone_number,
                    password,
                    role,
                });
                return res
                    .status(validationError.statusCode)
                    .json(APIError(validationError.name, validationError.msg));
            }

            // sign up
            const { err, result } = await AdminAuthService.signup({
                uuid,
                name,
                email,
                phone_number,
                password,
                role,
            });
            if (err) {
                logger.error(err.name, err.msg, {
                    uuid,
                    name,
                    email,
                    phone_number,
                    password,
                    role,
                });
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }

            // set token
            const { accessToken, refreshToken } = result.data;
            res.cookie('refresh_token', refreshToken, {
                maxAge: 86409000,
                path: `${baseURL}/auth/refreshToken`,
                expires: new Date(
                    new Date().getTime() + 86409000,
                ).toUTCString(),
                secure: false,
                httpOnly: true,
                sameSite: 'strict',
            });
            return res
                .status(result.statusCode)
                .json(APISuccess(result.msg, { accessToken }));
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
            const { err, result } = await AdminAuthService.login({
                username,
                password,
            });
            if (err) {
                logger.info(err.name, { username, password });
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }
            const { accessToken, refreshToken } = result.data;

            // set token
            res.cookie('refresh_token', refreshToken, {
                maxAge: 86409000,
                path: `${baseURL}/auth/refreshToken`,
                expires: new Date(
                    new Date().getTime() + 86409000,
                ).toUTCString(),
                secure: true,
                httpOnly: true,
                sameSite: 'strict',
            });
            return res
                .status(result.statusCode)
                .json(APISuccess(result.msg, { accessToken }));
        } catch (error) {
            return next(error);
        }
    },

    // TODO: Implement refresh token logic
    async refreshToken(req, res, next) {
        const token = req.cookies.refresh_token;
        try {
            const { err, result } = await AdminAuthService.refreshToken({
                token,
            });
            if (err) {
                logger.info(err);
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }
            const { accessToken, refreshToken } = result.data;
            res.cookie('refresh_token', refreshToken, {
                maxAge: 86409000,
                path: `${baseURL}/auth/refreshToken`,
                expires: new Date(
                    new Date().getTime() + 86409000,
                ).toUTCString(),
                secure: true,
                httpOnly: true,
                sameSite: 'strict',
            });
            return res
                .status(result.statusCode)
                .json(APISuccess(result.msg, { accessToken }));
        } catch (error) {
            return next(error);
        }
    },
};
