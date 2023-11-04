const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const config_db = require('../../config/mysql');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
    config_db.database,
    config_db.username,
    config_db.password,
    config_db,
);

fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js',
    )
    .forEach((file) => {
        // eslint-disable-next-line import/no-dynamic-require
        const model = require(`${path.join(__dirname, file)}`)(
            sequelize,
            Sequelize.DataTypes,
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// (async () => {
//     await sequelize.sync({ force: true });
// })();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
