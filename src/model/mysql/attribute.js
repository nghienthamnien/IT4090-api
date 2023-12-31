module.exports = (sequelize, DataTypes) => {
    const Attribute = sequelize.define(
        'Attribute',
        {
            attribute_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
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
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
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
        Attribute.hasMany(models.AttributeOption, {
            as: 'value',
            foreignKey: 'attribute_id',
        });
        Attribute.hasMany(models.AttributeSet, { foreignKey: 'attribute_id' });
    };

    return Attribute;
};
