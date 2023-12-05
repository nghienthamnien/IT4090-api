const router = require('express').Router();

const authJWT = require('../../middleware/auth-jwt');
const AttributeController = require('../../controller/admin/attributes-controller');

router.post('/', authJWT, AttributeController.createAtribute);

module.exports = router;
