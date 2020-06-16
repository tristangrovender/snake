import React, { useEffect, useState } from "react";

import Grid from "./Grid";
import "./App.css";

function moveSnake({ direction, body }) {
    // In functional programming we NEVER mutate - only copy and create. Commented out solution below mutates.
    const currentHead = body[body.length - 1];
    let newHead;
    if (direction === "down") {
        newHead = { ...currentHead, y: currentHead.y + 1 };
    } else if (direction === "up") {
        newHead = { ...currentHead, y: currentHead.y - 1 };
    } else if (direction === "right") {
        newHead = { ...currentHead, x: currentHead.x + 1 };
    } else if (direction === "left") {
        newHead = { ...currentHead, x: currentHead.x - 1 };
    }
    return [...body.slice(1), newHead];
}

function App() {
    const [gameState, setGameState] = useState({
        rowCount: 17,
        columnCount: 17,
        targetCircle: { x: 3, y: 15 },
        snake: {
            direction: "right",
            body: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]
        },
        frameRateInMs: 1000,
        refreshScreen: true
    });

    if (gameState.refreshScreen) {
        setTimeout(function() {
            setGameState({
                ...gameState,
                snake: {
                    ...gameState.snake,
                    body: moveSnake(gameState.snake)
                },
                refreshScreen: true
            });
        }, 1000);
        setGameState({
            ...gameState,
            refreshScreen: false
        });
    }

    const setDirection = direction => {
        setGameState({
            ...gameState,
            snake: {
                ...gameState.snake,
                direction
            }
        });
    };

    // TODO is update gameState.snake.direction with the correct direction in the below handler
    const directionHandler = ({ key }) => {
        if (key === "ArrowUp") {
            if (gameState.snake.direction !== "down") {
                setDirection("up");
            }
        } else if (key === "ArrowDown") {
            if (gameState.snake.direction !== "up") {
                setDirection("down");
            }
        } else if (key === "ArrowRight") {
            if (gameState.snake.direction !== "left") {
                setDirection("right");
            }
        } else if (key === "ArrowLeft") {
            if (gameState.snake.direction !== "right") {
                setDirection("left");
            }
        }
    };

    // Solution
    window.removeEventListener("keyup", directionHandler);
    window.addEventListener("keyup", directionHandler);

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
