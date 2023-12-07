const STATUS_CODES = require('../../constant/status-code');
const db = require('../../model/mysql');
const { ServiceError, ServiceSuccess } = require('../../util/common');
const logger = require('../../util/logger');

const { Attribute } = db;
module.exports = {
    async createAttribute(data) {
        const { attributeName, code, sortOrder, values } = data;
        if (!attributeName || !code || !values) {
            return ServiceError('Invalid Data', STATUS_CODES.INTERNAL_ERROR);
        }

        try {
            await Attribute.create(
                {
                    attribute_name: attributeName,
                    attribute_code: code,
                    sort_order: sortOrder,
                    value: values,
                },
                { include: [{ model: db.AttributeOption, as: 'value' }] },
            );
            return ServiceSuccess('Created', STATUS_CODES.CREATED);
        } catch (error) {
            logger.debug(error);
            return ServiceError('Internal Error', STATUS_CODES.INTERNAL_ERROR);
        }
    },
};
