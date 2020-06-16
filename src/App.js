import React, { useEffect, useState } from "react";

import Grid from "./Grid";
import "./App.css";

function App() {
    const upHandler = ({ key }) => {
        if (key === "ArrowUp") {
            console.log("up!");
        } else if (key === "ArrowDown") {
            console.log("down!");
        } else if (key === "ArrowRight") {
            console.log("right!");
        } else if (key === "ArrowLeft") {
            console.log("left!");
        }
    };

    // Add event listeners
    useEffect(() => {
        window.addEventListener("keyup", upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keyup", upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return (
        <div className="App">
            <Grid
                rowCount={17}
                columnCount={17}
                snake={{
                    direction: "down",
                    body: [{ x: 0, y: 3 }, { x: 0, y: 1 }, { x: 0, y: 2 }]
                }}
                targetCircle={{ x: 3, y: 15 }}
            />
        </div>
    );
}

export default App;
