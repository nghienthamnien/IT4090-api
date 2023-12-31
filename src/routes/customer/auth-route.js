const router = require('express').Router();
const AuthController = require('../../controller/customer/auth-controller');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

module.exports = router;
