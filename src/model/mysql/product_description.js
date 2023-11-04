module.exports = (sequelize, DataTypes) => {
    const ProductDescription = sequelize.define(
        'ProductDescription',
        {
            product_description_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            short_description: { type: DataTypes.TEXT, allowNull: true },
            description: { type: DataTypes.TEXT, allowNull: true },
            meta_title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            meta_keywords: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            url_key: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        { tableName: 'product_description' },
    );
    ProductDescription.associate = (model) => {
        ProductDescription.belongsTo(model.Product, {
            foreignKey: 'product_id',
        });
    };
    return ProductDescription;
};
