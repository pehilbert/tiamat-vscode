import React from "react";
import Conversation from "./conversation/Conversation";
import "./App.css";

const App = ({ theme }) => {
    return (
        <>
            <Conversation theme={theme} />
        </>
    );
};

export default App;
