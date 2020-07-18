var express = require("express");
var cors = require("cors");
var app = express();
var path = require("path");
var expressWs = require("express-ws")(app);

const { Reading } = require("./sequelize");

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
