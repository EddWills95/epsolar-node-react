// Sequelize stuff
const { Reading } = require("./sequelize");

// Server stuff
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require("cors");
const path = require("path");

// Stuff to do serial connection
var ModbusRTU = require("modbus-serial");

client = new ModbusRTU();

function connectAndRun(socket) {
    client.connectRTU("/dev/ttyUSB0", { baudRate: 115200 }, () => {

        client.setID(1);

        setInterval(() => {
            client.readInputRegisters(0x3100, 6, (err, data) => {
                // Read main data
                const [solar_voltage, solar_current, _a, _b, battery_voltage, charging_current] = data.data.map(d => parseFloat(d) / 100);
                // Read State of Charge
                client.readInputRegisters(0x311A, 1, (err, data) => {
                    const [state_of_charge] = data.data.map(d => parseFloat(d) / 100);

                    const dataObject = {
                        datetime: new Date(),
                        solar_voltage,
                        solar_current,
                        battery_voltage,
                        charging_current,
                        state_of_charge
                    }

                    socket.send(JSON.stringify(dataObject));

                    Reading.create(dataObject)
                })

            });
        }, 2000);

    });
}

const app = express();
app.use(cors());


// Check the serial bus for changed to the charger and then send new messages
// Then we can send that back to the UI

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Add readings endpoint (for later)
app.get("/readings", (req, res) => {
    Reading.findAll({ limit: req.query.limit, order: [['datetime', 'DESC']] })
        .then((readings) => {
            res.json(readings)
        });
});

//initialize a simple http server
const server = http.createServer(app);

// Websocket stuff
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    console.log('connected');

    connectAndRun(ws);

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

// Set up the listener
server.listen(8080);