import React, { useEffect, useState } from "react";

import Grid from "./Grid";
import "./App.css";

function moveSnake({ direction, body }) {
    // TODO: return a new body that has moved by one square

    // In functional programming we NEVER mutate - only copy and create. Commented out solution below mutates.
    const head = body[body.length - 1];
    return [...body.slice(1), { ...head, y: head.y + 1 }];
}

let timeout;
function App() {
    const [gameState, setGameState] = useState({
        rowCount: 17,
        columnCount: 17,
        targetCircle: { x: 3, y: 15 },
        snake: {
            direction: "down",
            body: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]
        },
        frameRateInMs: 1000
    });

    clearTimeout(timeout);
    // debugger;
    timeout = setTimeout(function() {
        setGameState({
            ...gameState,
            snake: {
                ...gameState.snake,
                body: moveSnake(gameState.snake)
            }
        });
    }, 1000);

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
                rowCount={gameState.rowCount}
                columnCount={gameState.columnCount}
                snake={gameState.snake}
                targetCircle={gameState.targetCircle}
            />
        </div>
    );
}

export default App;
