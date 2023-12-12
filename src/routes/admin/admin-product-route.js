const router = require('express').Router();

const authJWT = require('../../middleware/auth-jwt');
const upload = require('../../middleware/upload');
const ProductController = require('../../controller/admin/admin-product-controller');

router.post('/', authJWT, upload.any(), ProductController.createProduct);

module.exports = router;
