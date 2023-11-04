module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
        'Cart',
        {
            cart_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            is_paid: {
                type: DataTypes.BOOLEAN,
                default_value: false,
            },
        },
        { tableName: 'cart', timestamps: true },
    );

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, { foreignKey: 'user_id' });
        Cart.hasMany(models.CartItem, { foreignKey: 'cart_id' });
        Cart.belongsToMany(models.ProductEntity, {
            through: models.CartItem,
            foreignKey: 'cart_id',
            otherKey: 'product_entity_id',
        });
    };

    return Cart;
};
