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
        await queryInterface.createTable('admin', {
            admin_id: {
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
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: true,
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
            await queryInterface.addIndex('admin', ['uuid'], {
                fields: 'uuid',
                name: 'admin_uuid_idx',
                using: 'BTREE',
                transaction,
            });
            await queryInterface.addIndex('admin', ['email'], {
                fields: 'email',
                name: 'admin_email_idx',
                using: 'BTREE',
                transaction,
            });
            await queryInterface.addIndex('admin', ['phone_number'], {
                fields: 'phone_number',
                name: 'admin_sdt_idx',
                using: 'BTREE',
                transaction,
            });
            await transaction.commit();
            logger.info('Add indexes to table admin');
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
        await queryInterface.dropTable('admin');
    },
};
