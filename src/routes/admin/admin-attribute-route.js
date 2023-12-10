const router = require('express').Router();

const authJWT = require('../../middleware/auth-jwt');
const AttributeController = require('../../controller/admin/attributes-controller');

router.post('/', authJWT, AttributeController.createAtribute);
router.get('/', authJWT, AttributeController.findAllAttribute);
router.delete('/:id', authJWT, AttributeController.deleteAttribute);

module.exports = router;
