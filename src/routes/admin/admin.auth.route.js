const router = require('express').Router();
const AdminAuthController = require('../../controller/admin/admin.auth.controller');

router.post('/signup', AdminAuthController.signup);
router.post('/login', AdminAuthController.login);
router.get('/refreshToken', AdminAuthController.refreshToken);
module.exports = router;
