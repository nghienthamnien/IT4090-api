module.exports = (sequelize, DataTypes) => {
    const Catalog = sequelize.define(
        'Catalog',
        {
            catalog_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            parent_id: { type: DataTypes.INTEGER, allowNull: true },
        },
        {
            tableName: 'catalog',
            timestamps: true,
        },
    );

    Catalog.associate = (models) => {
        Catalog.hasMany(models.Product, { foreignKey: 'cat_id' });
        Catalog.hasMany(models.CatalogDescription, { foreignKey: 'cat_id' });
        Catalog.hasMany(models.Catalog, {
            as: 'child',
            foreignKey: 'parent_id',
        });
        Catalog.belongsTo(models.Catalog, {
            as: 'parent',
            foreignKey: 'parent_id',
        });
    };

    return Catalog;
};
