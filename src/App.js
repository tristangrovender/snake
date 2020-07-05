import React, { useEffect, useState } from "react";

import Grid from "./Grid";
import "./App.css";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { dispatch, getState } from "./store";
import { executeGameFrame, setSnakeDirection, startGame } from "./game-reducer";

setInterval(() => {
    const { gameState } = getState();
    if (gameState.isGameRunning === true) {
        dispatch(executeGameFrame());
    }
}, 150);

const keyUpHandler = ({ key }) => {
    const { gameState } = getState();

    if (key === "ArrowUp") {
        if (gameState.snake.direction !== "down") {
            dispatch(setSnakeDirection("up"));
        }
    } else if (key === "ArrowDown") {
        if (gameState.snake.direction !== "up") {
            dispatch(setSnakeDirection("down"));
        }
    } else if (key === "ArrowRight") {
        if (gameState.snake.direction !== "left") {
            dispatch(setSnakeDirection("right"));
        }
    } else if (key === "ArrowLeft") {
        if (gameState.snake.direction !== "right") {
            dispatch(setSnakeDirection("left"));
        }
    } else if (key === " ") {
        if (gameState.isGameRunning === false) {
            dispatch(startGame());
        }
    }
};
window.addEventListener("keyup", keyUpHandler);

function App() {
    const gameState = useSelector(state => state.gameState);
    return (
        <div className="App">
            <h1 className="score">Score: {gameState.score}</h1>
            <h1 className="title" style={{ height: "40px" }}>
                {gameState.statusText}
            </h1>
            <Grid
                rowCount={gameState.rowCount}
                columnCount={gameState.columnCount}
                snake={gameState.snake}
                targetCircle={gameState.targetCircle}
            />
        </div>
    );
}

export default connect()(App);
