const router = require('express').Router();

const authJWT = require('../../middleware/auth-jwt');
const EmployeeController = require('../../controller/admin/admin-employee-controller');

router.get('/', authJWT, EmployeeController.findAllEmployee);

module.exports = router;
