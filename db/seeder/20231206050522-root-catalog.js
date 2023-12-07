/* eslint-disable strict */

'use strict';

const { v4: uuidv4 } = require('uuid');
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
        const defaultFields = [
            {
                catalog_id: 1,
                uuid: uuidv4(),
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        ];
        try {
            await queryInterface.sequelize.query(
                'ALTER TABLE catalog AUTO_INCREMENT = 1',
                { transaction: t },
            );
            await queryInterface.bulkInsert('catalog', defaultFields, {
                transaction: t,
            });
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
        await queryInterface.bulkDelete('catalog', { catalog_id: 1 });
    },
};
