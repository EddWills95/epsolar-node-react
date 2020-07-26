// Sequelize stuff
const { initialSync, Reading } = require("./sequelize");
const EPSolarSerial = require("./ep-solar-serial");

// Server stuff
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const path = require("path");

// Stuff to do serial connection
var ModbusRTU = require("modbus-serial");

let oldData, newData;

const connectAndRun = async () => {
    const client = new EPSolarSerial();

    client.getRealTimeData().then((err, data) => {
        console.log({ err, data });
    });
};

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
    Reading.findAll({
        limit: req.query.limit,
        order: [["datetime", "DESC"]],
    }).then((readings) => {
        res.json(readings);
    });
});

//initialize a simple http server
const server = http.createServer(app);

// Websocket stuff
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    let interval;

    console.log("connected");

    interval = setInterval(() => {
        if (JSON.stringify(oldData) !== JSON.stringify(newData)) {
            ws.send(JSON.stringify(newData));
        }
    }, 1000);

    //connection is up, let's add a simple simple event
    ws.on("message", (message) => {
        //log the received message and send it back to the client
        console.log("received: %s", message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    ws.on("close", () => clearInterval(interval));
});

wss.broadcast = (msg) => {
    const { clients = [] } = wss;

    clients.forEach(function each(client) {
        client.send(msg);
    });
};

// Set up the listener
server.listen(8080);

// Start the data collection after the database has been synced up
initialSync().then(() => {
    console.log("Sync Complete");
    const EPSolar = new EPSolarSerial("/dev/ttyUSB1");

    EPSolar.connect()
        .then(() => {
            console.log("connected to serial");

            setInterval(() => {
                EPSolar.getData()
                    .then((data) => {
                        wss.broadcast(JSON.stringify(data));
                    })
                    .catch((err) => console.log(err));
            }, 1000);
        })
        .catch((err) => console.log(err));
});

// Start the initial fetching from the serial

//     EPSolar.connect().then(() => {
//         EPSolar.getStats().then((data, err) => {
//             console.log({ err, data });
//         }).catch((err) => {
//             console.log(err);
//         })
//     })
// })
