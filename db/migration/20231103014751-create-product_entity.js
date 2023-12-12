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
        await queryInterface.createTable('product_entity', {
            product_entity_id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            sku: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            quantity: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: true,
            },
            sold: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            product_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'product',
                    },
                    key: 'product_id',
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
        await queryInterface.dropTable('product_entity');
    },
};
