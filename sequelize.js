const Sequelize = require("sequelize");
const sqlite = require("sqlite3");
const SolarPowerModel = require("./models/solar-power");
const BatteryVoltageModel = require("./models/battery-voltage");

var sequelize = new Sequelize("example", "root", "", {
    host: "localhost",
    dialect: "sqlite",
    operatorsAliases: false,
    // SQLite database path
    storage: "./data/tracer-pi.sqlite",
    logging: false,
});

const SolarPower = SolarPowerModel(sequelize, Sequelize);
const BatteryVoltage = BatteryVoltageModel(sequelize, Sequelize);

const initialSync = () => {
    return sequelize.sync();
};

module.exports = {
    initialSync,
    SolarPower,
    BatteryVoltage,
};
