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
        await queryInterface.createTable('product', {
            product_id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            price: {
                type: Sequelize.DataTypes.DOUBLE,
                allowNull: false,
            },
            description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
            visibility: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            rating: {
                type: Sequelize.DataTypes.DOUBLE,
                allowNull: true,
                defaultValue: 5,
            },
            catalog_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'catalog',
                    },
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
        await queryInterface.dropTable('product');
    },
};
