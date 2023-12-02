const router = require('express').Router();
const AdminAuthController = require('../../controller/admin/admin.auth.controller');
const authJWT = require('../../middleware/auth-jwt');

router.post('/signup', authJWT, AdminAuthController.signup);
router.post('/login', AdminAuthController.login);
router.get('/refresh', AdminAuthController.refreshToken);
module.exports = router;
