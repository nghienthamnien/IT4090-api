const db = require('../model/mysql');
const { ValidationError } = require('../util/common');

module.exports = async (data) => {
    try {
        const { uuid, name, email, phone_number, password, role } = data;
        const err = await db.Admin.build({
            name,
            uuid,
            email,
            phone_number,
            password,
            role,
        })
            .validate()
            .then(() => false)
            .catch((error) => {
                const msg = [];
                error.errors.forEach((element) => {
                    msg.push(element.message);
                });
                return ValidationError(msg);
            });
        if (err) return err;

        //* Constrants phone_number unique
        const findAdmin = await db.Admin.findOne({
            where: { phone_number },
        });
        if (findAdmin) {
            return ValidationError('Phone number already exists');
        }
        return false;
    } catch (error) {
        throw new Error(error);
    }
};
