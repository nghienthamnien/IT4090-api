module.exports = (sequelize, DataTypes) => {
    const ProductAttributeValue = sequelize.define(
        'ProductAttributeValue',
        {
            option_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            entity_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        },
        { tableName: 'product_attribute_value', timestamps: true },
    );
    ProductAttributeValue.associate = (models) => {
        ProductAttributeValue.belongsTo(models.AttributeOption, {
            foreignKey: 'option_id',
        });
        ProductAttributeValue.belongsTo(models.ProductEntity, {
            foreignKey: 'entity_id',
        });
    };
    return ProductAttributeValue;
};
