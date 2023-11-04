module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order',
        {
            order_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            order_total: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            order_status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            order_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: 'order',
            timestamps: true,
        },
    );

    Order.associate = (models) => {
        Order.hasMany(models.OrderLine, { foreignKey: 'order_id' });
        Order.belongsTo(models.Address, { foreignKey: 'address_id' });
        Order.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Order;
};
