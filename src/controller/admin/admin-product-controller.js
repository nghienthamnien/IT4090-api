const { v4: uuidv4 } = require('uuid');
const AttributesService = require('../../service/admin/admin-attributes-service');
const ProductService = require('../../service/admin/admin-product-service');
const { APIError, APISuccess, ServiceError } = require('../../util/common');
const logger = require('../../util/logger');
const STATUS_CODES = require('../../constant/status-code');

module.exports = {
    async createProduct(req, res, next) {
        const {
            name,
            price,
            status,
            visible,
            catalog,
            description,
            short_description,
            meta_title,
            meta_keyword,
            url_key,
            product_entity,
        } = req.body;
        if (
            !name ||
            !price ||
            !catalog ||
            !description ||
            !short_description ||
            !meta_title ||
            !meta_keyword ||
            !url_key ||
            !product_entity
        ) {
            logger.debug(
                'Invalid data',
                name,
                price,
                catalog,
                description,
                short_description,
                meta_title,
                meta_keyword,
                url_key,
                product_entity,
            );
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json(APIError('Invalid data'));
        }
        try {
            const { err: attributeServiceErr, result: attributeServiceResult } =
                await AttributesService.findAttributeSet(catalog);

            if (attributeServiceErr) {
                return res
                    .status(attributeServiceErr.statusCode)
                    .json(
                        APIError(
                            attributeServiceErr.name,
                            attributeServiceErr.msg,
                        ),
                    );
            }

            const attributeSet = attributeServiceResult.data;
            const updatedProductEntity = product_entity.map(
                (element, index) => {
                    const images = req.files
                        .filter((file) => file.fieldname === `images[${index}]`)
                        .map((file) => ({
                            path: file.filename,
                        }));
                    const elementObj = JSON.parse(element);
                    elementObj.uuid = uuidv4();
                    const attributeValue = [];
                    attributeSet.forEach((attribute) => {
                        attributeValue.push({
                            option_id: elementObj[attribute.attribute_id],
                        });
                        delete elementObj[attribute.attribute_id];
                    });
                    return { ...elementObj, images, attributeValue };
                },
            );

            const product_uuid = uuidv4();
            const avatar = req.files[0].filename;
            const { err: productServiceErr, result: productServiceResult } =
                await ProductService.createProduct({
                    uuid: product_uuid,
                    avatar,
                    name,
                    price,
                    status: status || 0,
                    visibility: visible || 0,
                    catalog_id: catalog,
                    ProductDescriptions: [
                        {
                            description,
                            short_description,
                            meta_title,
                            meta_keyword,
                            url_key,
                        },
                    ],
                    item: updatedProductEntity,
                });
            if (productServiceErr) {
                return res
                    .status(productServiceErr.statusCode)
                    .json(
                        APIError(productServiceErr.name, productServiceErr.msg),
                    );
            }
            return res
                .status(productServiceResult.statusCode)
                .json(APISuccess(productServiceResult.msg));
        } catch (err) {
            return next(err);
        }
    },

    async findAllProduct(req, res, next) {
        const { page = 1 } = req.query;
        const limit = 10;
        const offset = limit * (page - 1);
        try {
            const { err, result } = await ProductService.findAllProduct({
                offset,
                limit,
            });
            if (err) {
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }
            return res.status(result.statusCode).json(result.data);
        } catch (error) {
            return next(error);
        }
    },
};
