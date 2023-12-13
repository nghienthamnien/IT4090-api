const router = require('express').Router();
const authJWT = require('../../middleware/auth-jwt');
const UserController = require('../../controller/admin/admin-customer-controller');

router.get('/', authJWT, UserController.findAllCustomer);

module.exports = router;
