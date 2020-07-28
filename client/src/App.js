import React, { useState, useEffect, useRef } from "react";

import { socketUrl } from "./constants";

import Battery from "./components/battery";
import Data from "./components/data";

import "./App.scss";

const App = () => {
    const [streamingData, setStreamingData] = useState({
        solarData: [],
        batteryData: [],
        generationStats: [],
    });
    const webSocket = useRef(null);

    useEffect(() => {
        try {
            webSocket.current = new WebSocket(socketUrl);
        } catch (error) {
            console.log(error);
        }

        webSocket.current.onopen = () => {
            console.log("websocket opened");
        };

        webSocket.current.onmessage = (message) => {
            try {
                setStreamingData(JSON.parse(message.data));
            } catch (error) {
                console.log(error);
            }
        };

        return () => {
            console.log("closing socket");
            webSocket.current.close();
        };
    }, []);

    const stateOfChange = () => {
        const SOC = streamingData.batteryData.find(
            (d) => d.label === "Battery SOC"
        );
        if (!SOC) return 0;
        return SOC.value;
    };

    return (
        <div className="app">
            <div className="header">
                <p>EP Solar - Pi</p>
                <Battery state={stateOfChange()} />
            </div>
            <div className="container">
                <Data
                    title="Solar"
                    data={streamingData.solarData}
                    endpoint="solar"
                />
                <Data
                    title="Battery"
                    data={streamingData.batteryData}
                    endpoint="battery"
                />
                <Data
                    title="Generation Stats"
                    data={streamingData.generationStats}
                />
            </div>
        </div>
    );
};

export default App;
