import React, { useState, useEffect, useRef } from "react";
import { socketUrl } from "./constants";

import logo from "./logo.svg";
import "./App.css";
import Container from "./components/container";

const App = () => {
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
            <p>EP Solar - Pi</p>
            {messages}
            <Container>
                <h2>HELLO</h2>
            </Container>
        </div>
    );
};

export default App;
