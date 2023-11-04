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
        await queryInterface.createTable('product_attribute_value', {
            option_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: { tableName: 'attribute_option' },
                    key: 'attribute_option_id',
                },
            },
            entity_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
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
        await queryInterface.dropTable('product_attribute_value');
    },
};
