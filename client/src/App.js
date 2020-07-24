import React, { useState, useEffect, useRef } from "react";

import { socketUrl } from "./constants";

import Data from "./components/data";

import "./App.scss";
import Battery from "./components/battery";

const App = () => {
    const [time, setTime] = useState(new Date().toLocaleString());
    const [streamingData, setStreamingData] = useState("{}");
    const webSocket = useRef(null);

    const stateOfCharge = () => {
        return JSON.parse(streamingData)["state_of_charge"];
    };

    const splitData = () => {
        const entries = Object.entries(JSON.parse(streamingData)) || [];
        // Remove datetime entry
        return entries.filter(([key, value]) => {
            if (key === "datetime") return false;
            if (key === "state_of_charge") return false;
            return true;
        });
    };

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
            // setMessages((prev) => [...prev, message.data]);
            try {
                setStreamingData(message.data);
            } catch (error) {
                console.log(Error);
            }
        };

        return () => {
            console.log("closing socket");
            webSocket.current.close();
        };
    }, []);

    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);
    }, []);

    // We should pass the data to the container which then splits it up into the relevant sections.

    return (
        <div className="app">
            <div className="header">
                <p>EP Solar - Pi</p>
                <Battery state={stateOfCharge()} />
            </div>
            <div className="container">
                {" "}
                {splitData().map(([key, value]) => (
                    <Data name={key} value={value} key={key} />
                ))}
            </div>{" "}
        </div>
    );
};

export default App;
