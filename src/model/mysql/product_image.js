module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define(
        'ProductImage',
        {
            product_image_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            path: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'product_image',
            timestamps: true,
        },
    );

    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.ProductEntity, {
            foreignKey: 'product_entity_id',
        });
    };

    return ProductImage;
};
