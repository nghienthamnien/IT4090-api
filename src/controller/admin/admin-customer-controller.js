const UserService = require('../../service/admin/admin-customer-service');
const { APIError, APISuccess } = require('../../util/common');
const logger = require('../../util/logger');

module.exports = {
    async findAllCustomer(req, res, next) {
        try {
            const { err, result } = await UserService.findAllCustomer();
            if (err) {
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }
            logger.debug(result);
            return res
                .status(result.statusCode)
                .json(APISuccess(result.msg, result.data));
        } catch (error) {
            logger.debug(error);
            return next(error);
        }
    },
};
