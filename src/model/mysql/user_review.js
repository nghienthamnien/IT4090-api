module.exports = (sequelize, DataTypes) => {
    const UserReview = sequelize.define(
        'UserReview',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: 1,
                        msg: 'rating must be greate than 1',
                    },
                    max: {
                        args: 5,
                        msg: 'rating must be less than 5',
                    },
                },
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: 'user_review',
            timestamps: true,
            updateAt: false,
        },
    );

    UserReview.associate = (models) => {
        UserReview.belongsTo(models.User, { foreignKey: 'user_id' });
        UserReview.belongsTo(models.OrderLine, { foreignKey: 'order_line_id' });
    };

    return UserReview;
};
