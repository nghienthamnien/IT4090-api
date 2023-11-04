module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define(
        'CartItem',
        {
            cart_item_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: 0,
                        msg: 'quantity must be great than 0',
                    },
                },
            },
        },
        {
            tableName: 'cart_item',
            timestamps: true,
        },
    );

    CartItem.associate = (model) => {
        CartItem.belongsTo(model.Cart, { foreignKey: 'cart_id' });
        CartItem.belongsTo(model.ProductEntity, {
            foreignKey: 'product_entity_id',
        });
    };

    return CartItem;
};
