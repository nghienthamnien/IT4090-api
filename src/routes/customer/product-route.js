const router = require('express').Router();
const ProductController = require('../../controller/customer/product-controller');

router.get('/trending', ProductController.findPopularProduct);
router.get('/collection', ProductController.findNewCollection);
router.get('/:uuid', ProductController.findByUUID);

module.exports = router;
