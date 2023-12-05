const { generateToken } = require('../src/util/auth');
const logger = require('../src/util/logger');

(async () => {
    const token = await generateToken(
        {
            uuid: '1234',
            name: 'Name',
            email: 'email@gmail.com',
            role: 1,
            phone_number: '0999999999',
        },
        '30d',
    );

    logger.debug(token);
})();
