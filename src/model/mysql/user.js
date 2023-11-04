module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            user_id: {
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
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: {
                    args: true,
                    msg: 'email đã được dùng',
                },
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Email không hợp lệ',
                    },
                },
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: {
                    args: true,
                    msg: 'số điện thoại đã được dùng',
                },
                validate: {
                    is: {
                        args: /^([+84|84|0]+(3[2-9]|5[2|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9]))+([0-9]{7})$/i,
                        msg: 'SDT không hợp lệ',
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: {
                        args: /^.{8,}$/i,
                        msg: 'Mật khẩu tối thiểu 8 ký tự',
                    },
                },
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            club_level: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true,
                validate: {
                    max: {
                        args: 5,
                        msg: 'club_level must be less or equal than 5',
                    },
                    min: {
                        args: [0],
                        msg: 'club_level must be greate or equal than 0',
                    },
                },
            },
        },
        {
            tableName: 'user',
            timestamps: true,
            indexes: [
                {
                    name: 'user_uuid_idx',
                    using: 'BTREE',
                    fields: ['uuid'],
                },
            ],
        },
    );

    User.associate = (models) => {
        User.hasMany(models.Address, {
            foreignKey: 'user_id',
        });
        User.hasMany(models.Cart, { foreignKey: 'user_id' });
        User.hasMany(models.Order, { foreignKey: 'user_id' });
        User.hasMany(models.UserReview, { foreignKey: 'user_id' });
    };

    return User;
};
