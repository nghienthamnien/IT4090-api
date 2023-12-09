const { Op } = require('sequelize');
const db = require('../../model/mysql');
const { ServiceSuccess, ServiceError } = require('../../util/common');
const STATUS_CODES = require('../../constant/status-code');
const logger = require('../../util/logger');

const { Catalog } = db;

module.exports = {
    async createCatalog(data) {
        const {
            uuid,
            name,
            parent_id,
            short_description,
            description,
            meta_title,
            meta_keywords,
            url_key,
            attributes,
            status,
        } = data;
        const t = await db.sequelize.transaction();
        try {
            const newCatalog = await Catalog.create(
                {
                    uuid,
                    parent_id: parent_id || 1,
                    status: status || 0,
                    // ** name of model is plural - dm sequlize
                    CatalogDescriptions: [
                        {
                            name,
                            short_description,
                            description,
                            meta_keywords,
                            meta_title,
                            url_key,
                        },
                    ],
                },
                {
                    include: [
                        {
                            model: db.CatalogDescription,
                            association: Catalog.CatalogDescription,
                        },
                    ],
                },
                { transaction: t },
            );
            if (attributes) {
                logger.debug(attributes);
                await newCatalog.addAttribute(attributes, {
                    transaction: t,
                });
            }
            await t.commit();
            return ServiceSuccess('Created', STATUS_CODES.CREATED);
        } catch (error) {
            logger.debug(error);
            await t.rollback();
            return ServiceError('Service Error', STATUS_CODES.INTERNAL_ERROR);
        }
    },
    async findAllCatalog() {
        try {
            const result = await Catalog.findAll({
                attributes: ['catalog_id', 'uuid', 'status', 'parent_id'],
                include: {
                    attributes: ['name', 'meta_title', 'url_key'],
                    model: db.CatalogDescription,
                },
                where: {
                    parent_id: {
                        [Op.in]: db.sequelize.literal(
                            `(SELECT catalog_id FROM catalog where parent_id=1)`,
                        ),
                    },
                    catalog_id: { [Op.gt]: 1 },
                },
                order: [['catalog_id', 'ASC']],
            });
            return ServiceSuccess('OK', STATUS_CODES.OK, result);
        } catch (error) {
            logger.debug(error);
            return ServiceError('service error', STATUS_CODES.INTERNAL_ERROR);
        }
    },
};
