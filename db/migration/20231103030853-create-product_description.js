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
        await queryInterface.createTable('product_description', {
            product_description_id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            short_description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            meta_description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            meta_title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            meta_keyword: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            url_key: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
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
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('product_description');
    },
};
