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
        await queryInterface.createTable('attribute_set', {
            attribute_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: { tableName: 'attribute' },
                    key: 'attribute_id',
                },
            },
            catalog_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: { tableName: 'catalog' },
                    key: 'catalog_id',
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
        await queryInterface.dropTable('attribute_set');
    },
};
