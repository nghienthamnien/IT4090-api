const STATUS_CODES = require('../../constant/status-code');
const db = require('../../model/mysql');
const { ServiceError, ServiceSuccess } = require('../../util/common');
const logger = require('../../util/logger');

const { Attribute } = db;
module.exports = {
    async createAttribute(data) {
        const { attributeName, code, sortOrder, values, type, visible } = data;
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
                    type,
                    visible,
                },
                { include: [{ model: db.AttributeOption, as: 'value' }] },
            );
            return ServiceSuccess('Created', STATUS_CODES.CREATED);
        } catch (error) {
            logger.debug(error);
            return ServiceError(
                'Attribute Service Error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },

    async findAllAttribute() {
        try {
            const result = await Attribute.findAll({
                attributes: [
                    'attribute_id',
                    'attribute_name',
                    'attribute_code',
                    'type',
                    'visible',
                ],
                order: [['attribute_id', 'ASC']],
            });
            return ServiceSuccess('OK', STATUS_CODES.OK, result);
        } catch (error) {
            return ServiceError('Attribute Service error', error);
        }
    },

    async deleteAttribute(attribute_id) {
        try {
            await db.sequelize.query(
                `DELETE attribute, attribute_option
                FROM attribute
                INNER JOIN attribute_option ON attribute.attribute_id = attribute_option.attribute_id
                WHERE attribute.attribute_id = :ATTRIBUTE_ID`,
                {
                    replacements: {
                        ATTRIBUTE_ID: attribute_id,
                    },
                    type: db.sequelize.QueryTypes.DELETE,
                },
            );
            return ServiceSuccess('OK', STATUS_CODES.OK);
        } catch (err) {
            logger.debug(err);
            return ServiceError(
                'Attribute Service error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },

    async findAttributeSet(catalog_id) {
        try {
            const result = await Attribute.findAll({
                attributes: ['attribute_id', 'attribute_name'],
                include: [
                    {
                        model: db.Catalog,
                        attributes: [],
                        required: true,
                        where: { catalog_id },
                        through: { model: db.AttributeSet, attributes: [] },
                    },
                    {
                        model: db.AttributeOption,
                        as: 'value',
                        attributes: ['attribute_option_id', 'attribute_value'],
                    },
                ],
            });
            return ServiceSuccess('OK', STATUS_CODES.OK, result);
        } catch (error) {
            logger.debug(error);
            return ServiceError(
                'Attribute Service error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },
};
