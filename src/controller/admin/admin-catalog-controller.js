const { v4: uuidv4 } = require('uuid');
// eslint-disable-next-line import/no-extraneous-dependencies
const _ = require('lodash');
const { APIError, APISuccess } = require('../../util/common');
const STATUS_CODES = require('../../constant/status-code');
const CatalogService = require('../../service/admin/admin-catalog-service');
const logger = require('../../util/logger');

module.exports = {
    async createCatalog(req, res, next) {
        const {
            name,
            parent_id,
            short_description,
            description,
            meta_title,
            meta_keywords,
            url_key,
            status,
            attributes,
        } = req.body;

        if (!name || !meta_title || !url_key) {
            logger.info('Invalid Data', {
                name,
                meta_title,
                url_key,
            });
            return res.status(STATUS_CODES.BAD_REQUEST).json(
                APIError('Invalid data', {
                    name,
                    meta_title,
                    url_key,
                    parent_id,
                }),
            );
        }
        const uuid = uuidv4();

        try {
            const { err, result } = await CatalogService.createCatalog({
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

    async findAllCatalog(req, res, next) {
        const buildTree = (data) => {
            const tree = [];
            const mapIdtoObj = {};
            data.forEach((treeNode) => {
                const { CatalogDescriptions } = treeNode;
                const newTreeNode = {
                    // eslint-disable-next-line node/no-unsupported-features/es-syntax
                    ...CatalogDescriptions[0].dataValues,
                    id: treeNode.catalog_id,
                    status: treeNode.status ? 'Enable' : 'Disable',
                    parent_id: treeNode.parent_id,
                    uuid: treeNode.uuid,
                };
                if (
                    Object.prototype.hasOwnProperty.call(
                        mapIdtoObj,
                        newTreeNode.parent_id,
                    )
                ) {
                    mapIdtoObj[newTreeNode.parent_id].children = [];
                }
                mapIdtoObj[newTreeNode.id] = _.cloneDeep(newTreeNode);
            });

            Object.keys(mapIdtoObj).forEach((id) => {
                if (Object.prototype.hasOwnProperty.call(mapIdtoObj, id)) {
                    const treeNode = mapIdtoObj[id];
                    if (treeNode.parent_id > 1) {
                        mapIdtoObj[treeNode.parent_id].children.push(treeNode);
                    } else {
                        tree.push(treeNode);
                    }
                }
            });
            return tree;
        };
        try {
            const { err, result } = await CatalogService.findAllCatalog();
            if (err) {
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }
            const tree = buildTree(result.data);
            return res
                .status(result.statusCode)
                .json(APISuccess(result.msg, tree));
        } catch (error) {
            return next(error);
        }
    },
};
