const router = require('express').Router();
const ProductController = require('../../controller/customer/product-controller');

router.get('/:catalog_id', ProductController.findByCatalog);

module.exports = router;
