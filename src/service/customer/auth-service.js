const { ServiceError, ServiceSuccess, APIError } = require('../../util/common');
const STATUS_CODES = require('../../constant/status-code');
const db = require('../../model/mysql');
const { accessTokenExpireIn, refreshTokenExpireIn } =
    require('../../config').jwt;
const {
    generateHash,
    generateToken,
    validateHash,
    validateToken,
} = require('../../util/auth');

const { User } = db;

module.exports = {
    async signup(data) {
        const { uuid, name, email, phone_number, password } = data;
        try {
            const hashPassword = await generateHash(password);
            await User.create({
                name,
                uuid,
                email,
                phone_number,
                password: hashPassword,
            });
            const accessToken = await generateToken(
                {
                    uuid,
                    name,
                    email,
                    phone_number,
                },
                accessTokenExpireIn,
            );
            return ServiceSuccess('Created', STATUS_CODES.CREATED, {
                accessToken,
                userInfo: { uuid, name, email, phone_number },
            });
        } catch (error) {
            return ServiceError(
                'Auth Service Error',
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
            const user = await User.findOne({
                attributes: [
                    'uuid',
                    'name',
                    'password',
                    'status',
                    'email',
                    'club_level',
                ],
                where: {
                    phone_number: username,
                },
            });

            if (!user)
                return ServiceError(
                    'Invalid phone number',
                    STATUS_CODES.UN_AUTHORIZED,
                );
            const checkPassword = await validateHash(password, user.password);
            if (checkPassword) {
                const accessToken = await generateToken(
                    {
                        uuid: user.uuid,
                        name: user.name,
                        email: user.email,
                        phone_number: username,
                    },
                    accessTokenExpireIn,
                );

                return ServiceSuccess('oke', STATUS_CODES.OK, {
                    accessToken,
                    userInfo: {
                        uuid: user.uuid,
                        name: user.name,
                        email: user.email,
                        phone_number: username,
                    },
                });
            }
            return ServiceError('Invalid data', STATUS_CODES.UN_AUTHORIZED);
        } catch (error) {
            return ServiceError(
                'Auth Service Error',
                STATUS_CODES.INTERNAL_ERROR,
                error.message,
            );
        }
    },
};
