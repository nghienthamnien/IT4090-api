module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define(
        'Address',
        {
            address_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            specific_address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            province: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            district: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            commune: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            is_default: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            tableName: 'address',
            timestamps: true,
            indexes: [
                {
                    name: 'address_district_idx',
                    using: 'BTREE',
                    fields: ['district'],
                },
                {
                    name: 'address_commune_idx',
                    using: 'BTREE',
                    fields: ['commune'],
                },
            ],
        },
    );

    Address.associate = (models) => {
        Address.belongsTo(models.User, {
            foreignKey: 'user_id',
        });
        Address.hasMany(models.Order, { foreignKey: 'address_id' });
    };

    return Address;
};
