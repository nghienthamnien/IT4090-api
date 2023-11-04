module.exports = (sequelize, DataTypes) => {
    const CatalogDescription = sequelize.define(
        'CatalogDescription',
        {
            catalog_description_id: {
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
        { tableName: 'catalog_description' },
    );
    CatalogDescription.associate = (model) => {
        CatalogDescription.belongsTo(model.Catalog, {
            foreignKey: 'catalog_id',
        });
    };
    return CatalogDescription;
};
