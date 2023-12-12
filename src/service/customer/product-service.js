const STATUS_CODES = require('../../constant/status-code');
const db = require('../../model/mysql');
const { ServiceSuccess, ServiceError } = require('../../util/common');
const logger = require('../../util/logger');

const { Product } = db;

module.exports = {
    async findNewCollection() {
        try {
            const result = await Product.findAll({
                attributes: ['product_id', 'uuid', 'name', 'avatar', 'price'],
                order: [['created_at', 'DESC']],
                limit: 8,
                where: { visibility: true },
            });
            return ServiceSuccess('OK', STATUS_CODES.OK, result);
        } catch (error) {
            logger.debug(error);
            return ServiceError(
                'find collection service error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },

    async findByCatalog(catalog_id) {
        try {
            const result = await db.sequelize.query(
                `SELECT 
                product_id, uuid, name, avatar, price
            FROM
                product AS Product
            WHERE
                ((Product.catalog_id IN (SELECT 
                        catalog_id
                    FROM
                        catalog
                    WHERE
                        parent_id = :CATALOG_ID)
                    OR Product.catalog_id = :CATALOG_ID)
                    AND visibility = 1)
            ORDER BY Product.created_at DESC
            LIMIT 12;`,
                {
                    replacements: {
                        CATALOG_ID: catalog_id,
                    },
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            return ServiceSuccess('OK', STATUS_CODES.OK, result);
        } catch (error) {
            logger.debug(error);
            return ServiceError(
                'find collection service error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },

    async findByUUID(uuid) {
        try {
            const result = await Product.findOne({
                attributes: [
                    'product_id',
                    'uuid',
                    'name',
                    'avatar',
                    'price',
                    'status',
                ],
                include: [
                    {
                        model: db.ProductDescription,
                        attributes: ['meta_title', 'url_key', 'description'],
                    },
                    {
                        model: db.Catalog,
                        include: [
                            {
                                model: db.CatalogDescription,
                                attributes: ['name'],
                            },
                        ],
                    },
                ],
                where: { uuid },
                // raw: true,
            });
            return ServiceSuccess(
                'OK',
                STATUS_CODES.OK,
                JSON.stringify(result),
            );
        } catch (error) {
            logger.debug(error);
            return ServiceError(
                'Product service error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },

    async findPopularProduct() {
        try {
            const result = await Product.findAll({
                attributes: ['product_id', 'uuid', 'name', 'avatar', 'price'],
                limit: 4,
                where: { visibility: true },
                include: [
                    {
                        model: db.ProductDescription,
                        attributes: ['meta_title', 'url_key'],
                    },
                    {
                        model: db.ProductEntity,
                        as: 'item',
                        attributes: ['sold'],
                        order: [['sold', 'DESC']],
                    },
                ],
            });
            return ServiceSuccess('OK', STATUS_CODES.OK, result);
        } catch (error) {
            logger.debug(error);
            return ServiceError(
                'find trending service error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },
};
