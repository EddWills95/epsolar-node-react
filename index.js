var express = require("express");
var cors = require("cors");
var app = express();
var path = require("path");
var expressWs = require("express-ws")(app);
var dateTime = require('node-datetime');

const { Reading } = require("./sequelize");

var ModbusRTU = require("modbus-serial");

client = new ModbusRTU();

client.connectRTU("/dev/ttyUSB0", { baudRate: 115200 }, run);

function run() {
    client.setID(1);

    setInterval(() => {
        client.readInputRegisters(0x3100, 6, (err, data) => {
            // Read main data
            const [solar_voltage, solar_current, _a, _b, battery_voltage, charging_current] = data.data.map(d => parseFloat(d) / 100);
            // Read State of Charge
            client.readInputRegisters(0x311A, 1, (err, data) => {
                const [state_of_charge] = data.data.map(d => parseFloat(d) / 100);

                Reading.create({
                    datatime: dateTime.create(),
                    solar_voltage,
                    solar_current,
                    battery_voltage,
                    charging_current,
                    state_of_charge
                })
            })

        });
    }, 1000);
}


app.use(cors());

// Check the serial bus for changed to the charger and then send new messages
// Then we can send that back to the UI

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.get("/readings", (req, res) => {
    Reading.findAll().then((readings) => res.json(readings));
});

app.ws("/ws", function (ws, req) {
    ws.on("message", function (msg) {
        console.log(msg);
    });
    console.log("socket", req.testing);
});

app.listen(8080);