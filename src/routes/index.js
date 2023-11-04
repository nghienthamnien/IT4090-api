const Router = require('express').Router();
require('./customer')(Router);
require('./admin')(Router);

module.exports = Router;
