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
        await queryInterface.createTable('order_line', {
            order_line_id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            price: { type: Sequelize.DataTypes.DOUBLE, allowNull: false },
            order_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: { tableName: 'order' },
                    key: 'order_id',
                },
            },
            product_entity_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: { tableName: 'product_entity' },
                    key: 'product_entity_id',
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
        await queryInterface.dropTable('order_line');
    },
};
