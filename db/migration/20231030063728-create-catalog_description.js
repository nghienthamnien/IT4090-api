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
        await queryInterface.createTable('catalog_description', {
            catalog_description_id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            short_description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            description: { type: Sequelize.DataTypes.TEXT, allowNull: true },
            image: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            meta_title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            meta_keywords: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            url_key: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            catalog_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'catalog',
                    },
                    key: 'catalog_id',
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
        await queryInterface.dropTable('catalog_description');
    },
};
