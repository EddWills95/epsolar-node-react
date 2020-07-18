const Sequelize = require("sequelize");
const sqlite = require("sqlite3");
const ReadingModel = require("./models/reading");

var sequelize = new Sequelize("example", "root", "", {
    host: "localhost",
    dialect: "sqlite",
    operatorsAliases: false,
    // SQLite database path
    storage: "./data/tracer-pi.sqlite",
});

const Reading = ReadingModel(sequelize, Sequelize);

sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);
});

module.exports = {
    Reading,
};
