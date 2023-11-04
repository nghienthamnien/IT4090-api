module.exports = (sequelize, DataTypes) => {
    const AttributeOption = sequelize.define(
        'AttributeOption',
        {
            attribute_option_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            attribute_value: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'attribute_option',
            timestamps: true,
        },
    );
    AttributeOption.associate = (models) => {
        AttributeOption.belongsTo(models.Attribute, {
            foreignKey: 'attribute_id',
        });
        AttributeOption.belongsToMany(models.ProductEntity, {
            through: models.ProductAttributeValue,
            foreignKey: 'option_id',
            otherKey: 'entity_id',
        });
        AttributeOption.hasMany(models.ProductAttributeValue, {
            foreignKey: 'option_id',
        });
    };
    return AttributeOption;
};
