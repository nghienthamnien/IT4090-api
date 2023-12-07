const STATUS_CODES = require('../../constant/status-code');
const { APIError, APISuccess } = require('../../util/common');
const logger = require('../../util/logger');
const AttributeService = require('../../service/admin/admin-attributes-service');

module.exports = {
    async createAtribute(req, res, next) {
        const { attributeName, code, sortOrder, attributeValue } = req.body;
        if (!attributeName || !code || !attributeValue || !sortOrder) {
            logger.info('Invalid data', {
                attributeName,
                code,
                attributeValue,
            });
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json(APIError('Bad Request'));
        }
        // eslint-disable-next-line arrow-body-style
        const values = attributeValue.map((value) => {
            return {
                attribute_value: value,
            };
        });
        try {
            const { err, result } = await AttributeService.createAttribute({
                attributeName,
                code,
                sortOrder,
                values,
            });
            if (err) {
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }
            return res.status(result.statusCode).json(APISuccess(result.msg));
        } catch (error) {
            return next(error);
        }
    },
};
