module.exports = (sequelize, DataTypes) => {
    const Attribute = sequelize.define(
        'Attribute',
        {
            attribute_id: {
                type: DataTypes.INTEGER,
                autoIncrement: false,
                primaryKey: true,
            },
            attribute_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            attribute_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sort_order: {
                type: DataTypes.INTEGER,
            },
        },
        {
            tableName: 'attribute',
            timestamps: true,
        },
    );

    Attribute.associate = (models) => {
        // Attribute.belongsToMany(models.ProductItem, {
        //     through: models.PropertyValue,
        //     foreignKey: 'attribute_id',
        //     otherKey: 'item_id',
        // });
        Attribute.belongsToMany(models.Catalog, {
            through: models.AttributeSet,
            foreignKey: 'attribute_id',
            otherKey: 'catalog_id',
        });
        // Attribute.hasMany(models.PropertyValue, {
        //     as: 'value',
        //     foreignKey: 'attribute_id',
        // });
    };

    return Attribute;
};
