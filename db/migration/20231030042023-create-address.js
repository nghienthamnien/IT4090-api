/* eslint-disable strict */

'use strict';

const logger = require('../../src/util/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('address', {
            address_id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            specific_address: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            province: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            district: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            commune: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            is_default: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'user',
                    },
                    key: 'user_id',
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
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addIndex('address', ['district'], {
                fields: 'district',
                name: 'address_district_idx',
                using: 'BTREE',
                transaction,
            });
            await queryInterface.addIndex('address', ['commune'], {
                fields: 'commune',
                name: 'address_commune_idx',
                using: 'BTREE',
                transaction,
            });
            await transaction.commit();
            logger.info('Add indexes to address admin');
        } catch (error) {
            await transaction.rollback();
            logger.error('Add indexes error', error.message);
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        queryInterface.dropTable('address');
    },
};
