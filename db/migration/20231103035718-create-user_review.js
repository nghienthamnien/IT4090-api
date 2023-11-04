/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('user_review', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            rating: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            comment: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: { tableName: 'user' },
                    key: 'user_id',
                },
            },
            order_line_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: { tableName: 'order_line' },
                    key: 'order_line_id',
                },
            },
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('user_review');
    },
};
