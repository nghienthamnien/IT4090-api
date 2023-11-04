const STATUS_CODES = require('../constant/status-code');

const isAdmin = (req, res, next) => {
    if (req.user.role) next();
    return res.status(STATUS_CODES.UN_AUTHORIZED).json("Can't access");
};

module.exports = {
    isAdmin,
};
