module.exports = (sequelize, DataTypes) => {
    const AttributeSet = sequelize.define(
        'AttributeSet',
        {
            attribute_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            catalog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        },
        { tableName: 'attribute_set', timestamps: true },
    );
    AttributeSet.associate = (models) => {
        AttributeSet.belongsTo(models.Attribute, {
            foreignKey: 'attribute_id',
        });
        AttributeSet.belongsTo(models.Catalog, {
            foreignKey: 'catalog_id',
        });
    };
    return AttributeSet;
};
