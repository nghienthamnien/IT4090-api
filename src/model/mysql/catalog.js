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
        Catalog.hasMany(models.Product, { foreignKey: 'catalog_id' });
        Catalog.hasMany(models.CatalogDescription, {
            foreignKey: 'catalog_id',
        });
        Catalog.hasMany(models.Catalog, {
            as: 'child',
            foreignKey: 'parent_id',
        });
        Catalog.belongsTo(models.Catalog, {
            as: 'parent',
            foreignKey: 'parent_id',
        });
        Catalog.belongsToMany(models.Attribute, {
            through: models.AttributeSet,
            foreignKey: 'catalog_id',
            otherKey: 'attribute_id',
        });
        Catalog.hasMany(models.AttributeSet, {
            foreignKey: 'catalog_id',
        });
    };

    return Catalog;
};
