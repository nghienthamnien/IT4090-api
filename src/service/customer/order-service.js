const STATUS_CODES = require('../../constant/status-code');
const db = require('../../model/mysql');
const { ServiceError, ServiceSuccess } = require('../../util/common');

const { Order } = db;

module.exports = {
    async createOrder(data) {
        const {
            uuid,
            order_total,
            order_status,
            address_id,
            user_id,
            orderLines,
        } = data;
        try {
            await Order.create(
                {
                    uuid,
                    order_total,
                    order_status,
                    address_id,
                    user_id,
                    OrderLines: orderLines,
                },
                { include: [{ model: db.OrderLine }] },
            );
            return ServiceSuccess('Create', STATUS_CODES.CREATED);
        } catch (error) {
            return ServiceError(
                'Create order error',
                STATUS_CODES.INTERNAL_ERROR,
            );
        }
    },
};
