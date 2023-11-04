module.exports = (sequelize, DataTypes) => {
    const OrderLine = sequelize.define(
        'OrderLine',
        {
            order_line_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: { type: DataTypes.DOUBLE, allowNull: false },
        },
        {
            tableName: 'order_line',
            timestamps: true,
        },
    );

    OrderLine.associate = (models) => {
        OrderLine.belongsTo(models.Order, { foreignKey: 'order_id' });
        OrderLine.hasOne(models.UserReview, { foreignKey: 'order_line_id' });
        OrderLine.belongsTo(models.ProductEntity, {
            foreignKey: 'product_entity_id',
        });
    };

    return OrderLine;
};
