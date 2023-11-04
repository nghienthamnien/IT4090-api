module.exports = (sequelize, DataTypes) => {
    const ProductEntity = sequelize.define(
        'ProductEntity',
        {
            product_entity_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            sku: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            quantity_in_stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: 'product_entity',
            timestamps: true,
        },
    );

    ProductEntity.associate = (models) => {
        ProductEntity.belongsTo(models.Product, { foreignKey: 'product_id' });
        ProductEntity.hasMany(models.ProductImage, {
            as: 'image',
            foreignKey: 'product_entity_id',
        });
        ProductEntity.belongsToMany(models.AttributeOption, {
            through: models.ProductAttributeValue,
            foreignKey: 'entity_id',
            otherKey: 'option_id',
        });
        ProductEntity.hasMany(models.ProductAttributeValue, {
            foreignKey: 'entity_id',
        });
        ProductEntity.hasMany(models.CartItem, {
            foreignKey: 'product_entity_id',
        });
        ProductEntity.belongsToMany(models.Cart, {
            through: models.CartItem,
            foreignKey: 'product_entity_id',
            otherKey: 'cart_id',
        });
    };

    return ProductEntity;
};
