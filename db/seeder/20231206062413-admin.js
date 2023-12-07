/* eslint-disable strict */

'use strict';

const { v4: uuidv4 } = require('uuid');
const { generateHash } = require('../../src/util/auth');
const logger = require('../../src/util/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const t = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.sequelize.query(
                'ALTER TABLE catalog AUTO_INCREMENT = 0',
                { transaction: t },
            );
            await queryInterface.bulkInsert(
                'admin',
                [
                    {
                        admin_id: 1,
                        uuid: uuidv4(),
                        name: 'Nguyen Van A',
                        email: 'nguyenvana@test.com',
                        phone_number: '0987654321',
                        password: await generateHash('12345678'),
                        role: 0,
                        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                ],
                { transaction: t },
            );
            await t.commit();
        } catch (error) {
            logger.debug(error);
            await t.rollback();
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('admin', { admin_id: 1 });
    },
};
