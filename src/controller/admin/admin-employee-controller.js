const EmployeeService = require('../../service/admin/admin-employee-service');
const { APIError, APISuccess } = require('../../util/common');

module.exports = {
    async findAllEmployee(req, res, next) {
        try {
            const { err, result } = await EmployeeService.findAllEmployee();
            if (err) {
                return res
                    .status(err.statusCode)
                    .json(APIError(err.name, err.msg));
            }
            return res
                .status(result.statusCode)
                .json(APISuccess(result.msg, result.data));
        } catch (error) {
            return next(error);
        }
    },
};
