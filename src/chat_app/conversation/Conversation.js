import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from "./Message";
import "./Conversation.css";

const minID = 1;
const maxID = 100000;
const conversationID = Math.floor(Math.random() * (maxID - minID + 1)) + minID;

const Conversation = () => {
    const [prompt, setPrompt] = useState("");
    const [testMode, setTestMode] = useState(false);
    const [messageHistory, setMessageHistory] = useState([]);
    const [enabled, setEnabled] = useState(true);

    const testMessages = [
        "This is a test message.",
        "Here's a random response.",
        "I'm in test mode, no API calls here!",
        "Hello! Here is a **bold** text, an *italicized* word, and a [link](https://www.example.com).",
        "Another test response!"
      ];

    const queryAssistant = async (msg) => {
        if (testMode === true) {
            return testMessages[Math.floor(Math.random() * testMessages.length)];
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/prompt', {
                     message: msg,
                     id: conversationID
                });
                return response.data.response;
            } catch (error) {
                console.error('Error:', error);
                return error.message;
            }
        }
    };

    const sendMessage = async () => {
        if (enabled && prompt.trim()) {
            setEnabled(false);

            setMessageHistory((prevMessages) => [{speaker: "You", content: prompt.trim()}, ...prevMessages]);
            setPrompt("");

            let response = await queryAssistant(prompt.trim());
            setMessageHistory((prevMessages) => [{speaker: "Tiamat", content: response}, ...prevMessages]);

            setEnabled(true);
        }
    };

    const handleKeyDown = async (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            await sendMessage();
        }
    };

    const exportConversation = () => {
        const textContent = messageHistory
        .map(message => `${message.speaker}: ${message.content}`)
        .reverse()
        .join('\n');
    
    const blob = new Blob([textContent], { type: 'text/plain'});
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'conversation.txt';
    link.click();
    };

    return (
        <div className="conversation">
            <div className="test-mode">
                <label for="test-mode">Test Mode:</label>
                <input className="test-mode-checkbox"
                    name="test-mode"
                    type="checkbox"
                    value={testMode}
                    onChange={() => testMode = setTestMode(!testMode)}
                />
            </div>
            <div className="messages">
                {messageHistory.map((message, index) => (
                    <Message speaker={message.speaker} content={message.content} />
                ))}
            </div>
            <div className="input-section">
                <textarea className="user-input"
                    placeholder="Type your message here"
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
                <button className='export-button' onClick={exportConversation}>Export</button>
            </div>
        </div>
    );
};

export default Conversation;
