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
        await queryInterface.createTable('order', {
            order_id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            order_total: {
                type: Sequelize.DataTypes.DOUBLE,
                allowNull: false,
            },
            order_status: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            order_date: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: { model: { tableName: 'user' }, key: 'user_id' },
            },
            address_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: { tableName: 'address' },
                    key: 'address_id',
                },
            },
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
            updated_at: {
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
        await queryInterface.dropTable('order');
    },
};
