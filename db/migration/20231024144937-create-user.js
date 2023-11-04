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
        await queryInterface.createTable('user', {
            user_id: {
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
                allowNull: true,
                unique: true,
            },
            phone_number: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: true,
            },
            club_level: {
                type: Sequelize.DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true,
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
            await queryInterface.addIndex('user', ['uuid'], {
                fields: 'uuid',
                name: 'admin_uuid_idx',
                using: 'BTREE',
                transaction,
            });
            await queryInterface.addIndex('user', ['email'], {
                fields: 'email',
                name: 'admin_email_idx',
                using: 'BTREE',
                transaction,
            });
            await queryInterface.addIndex('user', ['phone_number'], {
                fields: 'phone_number',
                name: 'admin_sdt_idx',
                using: 'BTREE',
                transaction,
            });
            await transaction.commit();
            logger.info('Add indexes to table user');
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
        await queryInterface.dropTable('user');
    },
};
