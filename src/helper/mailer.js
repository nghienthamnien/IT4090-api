const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('../util/logger');

const { mailer } = config;

/**
 * Description
 * @param {string} username
 * @param {string} email
 * @param {string} subject
 * @param {string} text
 * @param {html} html
 * @returns {any}
 */
async function sendEmail(username, email, subject, text, html) {
    try {
        const transporter = nodemailer.createTransport(mailer);
        const mail = {
            from: 'kelton.jacobs@ethereal.email',
            to: `${username} <${email}>`,
            subject,
            text,
            html,
        };
        await transporter.sendMail(mail);
        logger.info(`send mail to ${username} success`);
    } catch (error) {
        logger.error(error);
        throw new Error('mail service error');
    }
}

module.exports = sendEmail;
