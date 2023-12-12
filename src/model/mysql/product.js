module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
        {
            product_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            visibility: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            rating: {
                type: DataTypes.DOUBLE,
                allowNull: true,
                defaultValue: 5,
            },
        },
        {
            tableName: 'product',
            timestamps: true,
        },
    );

    Product.associate = (models) => {
        Product.belongsTo(models.Catalog, { foreignKey: 'catalog_id' });
        Product.hasMany(models.ProductEntity, {
            as: 'item',
            foreignKey: 'product_id',
        });
        Product.hasMany(models.ProductDescription, {
            foreignKey: 'product_id',
        });
    };
    return Product;
};
