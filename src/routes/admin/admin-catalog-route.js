const router = require('express').Router();
const authJWT = require('../../middleware/auth-jwt');
const CatalogController = require('../../controller/admin/admin-catalog-controller');

router.post('/', authJWT, CatalogController.createCatalog);
router.get('/', authJWT, CatalogController.findAllCatalog);
router.delete('/:uuid', authJWT, CatalogController.deleteCatalog);

module.exports = router;
