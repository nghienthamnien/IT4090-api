const ProductService = require('../../service/customer/product-service');
const { APIError, APISuccess } = require('../../util/common');

module.exports = {
    async findNewCollection(req, res, next) {
        try {
            const { err, result } = await ProductService.findNewCollection();
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

    async findByCatalog(req, res, next) {
        try {
            const { catalog_id } = req.params;
            const { err, result } = await ProductService.findByCatalog(
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

    async findByUUID(req, res, next) {
        try {
            const { uuid } = req.params;
            const { err, result } = await ProductService.findByUUID(uuid);
            if (err) {
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }
            const product = JSON.parse(result.data);
            const formatedProduct = {
                ...product.ProductDescriptions[0],
                ...{ catalog: product.Catalog.CatalogDescriptions[0].name },
            };
            delete product.ProductDescriptions;
            delete product.Catalog;
            return res
                .status(result.statusCode)
                .json(
                    APISuccess(result.msg, { ...product, ...formatedProduct }),
                );
        } catch (error) {
            return next(error);
        }
    },

    async findPopularProduct(req, res, next) {
        try {
            const { err, result } = await ProductService.findPopularProduct();
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
