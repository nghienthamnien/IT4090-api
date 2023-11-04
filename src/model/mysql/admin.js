module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define(
        'Admin',
        {
            admin_id: {
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
                allowNull: false,
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Email không hợp lệ',
                    },
                },
            },
            phone_number: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: 'số điện thoại đã được dùng',
                },
                allowNull: false,
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
            role: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {
                        args: true,
                        msg: 'value must be integer',
                    },
                },
            },
        },
        {
            tableName: 'admin',
            timestamps: true,
            indexes: [
                {
                    name: 'admin_uuid_idx',
                    using: 'BTREE',
                    fields: ['uuid'],
                },
            ],
        },
    );
    return Admin;
};
