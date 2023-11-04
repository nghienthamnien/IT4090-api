const { ServiceError, ServiceSuccess, APIError } = require('../../util/common');
const STATUS_CODES = require('../../constant/status-code');
const db = require('../../model/mysql');
const {
    generateHash,
    generateToken,
    validateHash,
    validateToken,
} = require('../../util/auth');
const logger = require('../../util/logger');

const { Admin } = db;

module.exports = {
    /**
     * Description
     * @param {{
     * uuid: uuidv4;
     * name: string;
     * email: string;
     * phone_number: number;
     * password: string;
     * role: TinyIntegerDataType;
     * }} [data]
     * @returns {response}
     */
    async signup(data) {
        const { uuid, name, email, phone_number, password, role } = data;
        try {
            if (
                !uuid ||
                !name ||
                !email ||
                !phone_number ||
                !password ||
                !role
            ) {
                return ServiceError(
                    'Bad Request',
                    STATUS_CODES.BAD_REQUEST,
                    'Invalid data',
                );
            }
            const hashPassword = await generateHash(password);
            await Admin.create({
                name,
                uuid,
                email,
                phone_number,
                password: hashPassword,
                role,
            });
            const { accessToken, refreshToken } = await generateToken({
                uuid,
                name,
                phone_number,
                email,
                role,
            });
            return ServiceSuccess('Created', STATUS_CODES.CREATED, {
                accessToken,
                refreshToken,
            });
        } catch (error) {
            return ServiceError(
                'Internal Error',
                STATUS_CODES.INTERNAL_ERROR,
                error,
            );
        }
    },

    /**
     * Description
     * @param {
     *  {
     *    username: phone_number;
     *    password: string
     *  }
     * } [data]
     * @returns {any}
     */
    async login(data) {
        const { username, password } = data;
        try {
            const admin = await Admin.findOne({
                attributes: ['uuid', 'name', 'password', 'role', 'email'],
                where: {
                    phone_number: username,
                },
            });

            if (!admin)
                return ServiceError(
                    'Invalid phone number',
                    STATUS_CODES.UN_AUTHORIZED,
                );
            const checkPassword = await validateHash(password, admin.password);
            if (checkPassword) {
                const { accessToken, refreshToken } = await generateToken({
                    uuid: admin.uuid,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                    phone_number: username,
                });
                return ServiceSuccess('oke', STATUS_CODES.OK, {
                    accessToken,
                    refreshToken,
                });
            }
            return ServiceError('Invalid data', STATUS_CODES.UN_AUTHORIZED);
        } catch (error) {
            return ServiceError(
                'Internal Error',
                STATUS_CODES.INTERNAL_ERROR,
                error.message,
            );
        }
    },

    // TODO Implement refresh token logic
    async refreshToken(data) {
        const { token } = data;
        try {
            const decode = await validateToken(token);
            logger.debug(decode);
            const { accessToken, refreshToken } = await generateToken({
                hhj: 'kjjk',
            });
            return ServiceSuccess('oke', STATUS_CODES.OK, {
                accessToken,
                refreshToken,
            });
        } catch (error) {
            logger.debug(error);
            return ServiceError(
                'Unauthorized',
                STATUS_CODES.UN_AUTHORIZED,
                error,
            );
        }
    },
};
