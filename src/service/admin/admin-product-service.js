const STATUS_CODES = require('../../constant/status-code');
const db = require('../../model/mysql');
const { ServiceSuccess, ServiceError } = require('../../util/common');
const logger = require('../../util/logger');

const { Product } = db;

module.exports = {
    async createProduct(data) {
        const {
            uuid,
            avatar,
            name,
            price,
            status,
            visibility,
            catalog_id,
            ProductDescriptions,
            item,
        } = data;
        const t = await db.sequelize.transaction();
        try {
            await Product.create(
                {
                    uuid,
                    name,
                    avatar,
                    price,
                    visibility,
                    status,
                    catalog_id,
                    ProductDescriptions,
                    item,
                },
                {
                    include: [
                        { model: db.ProductDescription },
                        {
                            model: db.ProductEntity,
                            as: 'item',
                            include: [
                                { model: db.ProductImage, as: 'images' },
                                {
                                    model: db.ProductAttributeValue,
                                    as: 'attributeValue',
                                },
                            ],
                        },
                    ],
                    transaction: t,
                },
            );
            await t.commit();
            return ServiceSuccess('Created', STATUS_CODES.CREATED);
        } catch (error) {
            await t.rollback();
            logger.debug(error);
            return ServiceError(
                'Product service error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },
};
