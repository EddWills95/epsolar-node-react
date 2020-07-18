import React, { useState, useEffect, useRef } from "react";

import logo from "./logo.svg";
import "./App.css";

const App = () => {
    const socketUrl = process.env.REACT_APP_ENDPOINT || "ws://localhost:8080";
    console.log(socketUrl);

    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);

    useEffect(() => {
        webSocket.current = new WebSocket(socketUrl);
        webSocket.current.onopen = () => {
            console.log("websocket opened");
        };
        webSocket.current.onmessage = (message) => {
            setMessages((prev) => [...prev, message.data]);
        };
        return () => {
            console.log("closing socket");
            webSocket.current.close();
        };
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    This should change something
                </a>
                {messages}
            </header>
        </div>
    );
};

export default App;
