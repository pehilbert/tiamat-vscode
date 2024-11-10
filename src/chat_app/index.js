import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log("React app is loading");

const Root = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Listen for messages from VSCode
        window.addEventListener("message", (event) => {
            const message = event.data;
            if (message.type === 'set-theme') {
                setTheme(message.theme === 1 ? "light" : "dark"); // 1 for Light, 2 for Dark
            }
        });
    }, []);

    return <App theme={theme} />;
};

ReactDOM.render(<Root />, document.getElementById('root'));
