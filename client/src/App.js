import React, { useState, useEffect, useRef } from "react";

import { socketUrl } from "./constants";

import Data from "./components/data";

import "./App.scss";

const App = () => {
    const [time, setTime] = useState(new Date().toLocaleString());
    const [streamingData, setStreamingData] = useState("{}");
    const webSocket = useRef(null);

    const splitData = () => {
        const entries = Object.entries(JSON.parse(streamingData)) || [];
        // Remove datetime entry
        return entries.filter(([key, value]) => key !== "datetime");
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
            message && setStreamingData(message.data);
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
            {" "}
            <p>EP Solar - Pi</p>
            <span>{time}</span>
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
