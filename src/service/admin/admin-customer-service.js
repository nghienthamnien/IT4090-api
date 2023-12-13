const STATUS_CODES = require('../../constant/status-code');
const db = require('../../model/mysql');
const { ServiceError, ServiceSuccess } = require('../../util/common');

const { User } = db;

module.exports = {
    async findAllCustomer() {
        try {
            const result = await User.findAll({
                attributes: [
                    'user_id',
                    'uuid',
                    'name',
                    'email',
                    'status',
                    'phone_number',
                ],
            });
            return ServiceSuccess('OK', STATUS_CODES.OK, result);
        } catch (error) {
            return ServiceError(
                'Find Customer Error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },
};
