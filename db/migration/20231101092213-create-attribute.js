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
        await queryInterface.createTable('attribute', {
            attribute_id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            attribute_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            attribute_code: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            sort_order: {
                type: Sequelize.DataTypes.INTEGER,
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
        await queryInterface.dropTable('attribute');
    },
};
