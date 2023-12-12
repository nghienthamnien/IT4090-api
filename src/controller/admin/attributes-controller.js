const STATUS_CODES = require('../../constant/status-code');
const { APIError, APISuccess } = require('../../util/common');
const logger = require('../../util/logger');
const AttributeService = require('../../service/admin/admin-attributes-service');

module.exports = {
    async createAtribute(req, res, next) {
        const {
            attributeName,
            code,
            sortOrder,
            attributeValue,
            type,
            visible,
        } = req.body;
        if (
            !attributeName ||
            !code ||
            !attributeValue ||
            !sortOrder ||
            type === undefined
        ) {
            logger.info('Invalid data', {
                attributeName,
                code,
                attributeValue,
                type,
            });
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json(APIError('Bad Request'));
        }
        let values;
        if (typeof attributeValue === 'string')
            values = [{ attribute_value: attributeValue }];
        else {
            // eslint-disable-next-line arrow-body-style
            values = attributeValue.map((value) => {
                return {
                    attribute_value: value,
                };
            });
        }
        try {
            const { err, result } = await AttributeService.createAttribute({
                attributeName,
                code,
                sortOrder,
                values,
                type,
                visible,
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

    async findAllAttribute(req, res, next) {
        try {
            const { err, result } = await AttributeService.findAllAttribute();
            if (err) {
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

    async deleteAttribute(req, res, next) {
        const attribute_id = req.params.id;
        try {
            const { err, result } = await AttributeService.deleteAttribute(
                attribute_id,
            );
            if (err) {
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

    async findAttributeSet(req, res, next) {
        const catalog_id = req.params.catalogId;
        try {
            const { err, result } = await AttributeService.findAttributeSet(
                catalog_id,
            );
            if (err) {
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
};
