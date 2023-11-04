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
        await queryInterface.createTable('cart_item', {
            cart_item_id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            cart_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: { model: { tableName: 'cart' }, key: 'cart_id' },
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
        await queryInterface.dropTable('cart_item');
    },
};
