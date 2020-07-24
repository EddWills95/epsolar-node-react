const Sequelize = require("sequelize");
const sqlite = require("sqlite3");
const ReadingModel = require("./models/reading");

var sequelize = new Sequelize("example", "root", "", {
    host: "localhost",
    dialect: "sqlite",
    operatorsAliases: false,
    // SQLite database path
    storage: "./data/tracer-pi.sqlite",
    logging: false
});

const Reading = ReadingModel(sequelize, Sequelize);

const initialSync = () => {
    return sequelize.sync({ force: true });
};


module.exports = {
    initialSync,
    Reading,
};
