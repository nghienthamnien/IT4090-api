const STATUS_CODES = require('../../constant/status-code');
const db = require('../../model/mysql');
const { ServiceSuccess, ServiceError } = require('../../util/common');

const { Admin } = db;

module.exports = {
    async findAllEmployee() {
        try {
            const result = await Admin.findAll({
                attributes: [
                    'admin_id',
                    'uuid',
                    'name',
                    'email',
                    'phone_number',
                    'status',
                    'role',
                ],
            });
            return ServiceSuccess('OK', STATUS_CODES.OK, result);
        } catch (error) {
            return ServiceError(
                'Employee service error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },
};
