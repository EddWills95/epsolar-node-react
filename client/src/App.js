import React, { useState, useEffect, useRef } from "react";

// import { socketUrl } from "./constants";

import Data from "./components/data";
import Battery from "./components/battery";

import "./App.scss";

const socketUrl = `ws://${process.env.REACT_APP_ENDPOINT || "localhost"}:8080`;

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

    const generateSuffix = (label) => {
        const lowerCaseLabel = label.toLowerCase();
        if (lowerCaseLabel.includes("voltage")) return "V";
        if (lowerCaseLabel.includes("power")) return "W";
        if (lowerCaseLabel.includes("current")) return "A";
        if (lowerCaseLabel.includes("generated")) return "kW/h";
    };

    return (
        <div className="app">
            <div className="header">
                <p>EP Solar - Pi</p>
            </div>
            <div className="container">
                <div className="data-container">
                    <h2 className="data-container__title">Solar</h2>
                    {streamingData.solarData.map((data, index) => (
                        <div className="data-container__data" key={index}>
                            <p> {data.label}</p>{" "}
                            <p>
                                {" "}
                                {data.value}
                                <span className="data-container__data__suffix">
                                    {generateSuffix(data.label)}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
                <div className="data-container">
                    <h2 className="data-container__title">Battery</h2>
                    {streamingData.batteryData.map((data, index) => (
                        <div className="data-container__data" key={index}>
                            <p> {data.label}</p>{" "}
                            <p>
                                {" "}
                                {data.value}
                                <span className="data-container__data__suffix">
                                    {generateSuffix(data.label)}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
                <div className="data-container">
                    <h2 className="data-container__title">Energy Generation</h2>
                    {streamingData.generationStats.map((data, index) => (
                        <div className="data-container__data" key={index}>
                            <p>{data.label}</p>
                            <p>
                                {data.value}
                                <span className="data-container__data__suffix">
                                    {generateSuffix(data.label)}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
