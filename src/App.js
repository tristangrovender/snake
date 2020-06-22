import React, { useEffect, useState } from "react";

import Grid from "./Grid";
import "./App.css";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { dispatch, getState } from "./store";
import { executeGameFrame, setSnakeDirection } from "./game-reducer";

setInterval(() => {
    dispatch(executeGameFrame());
}, 500);

const directionHandler = ({ key }) => {
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
    }
};
window.addEventListener("keyup", directionHandler);

function App() {
    const gameState = useSelector(state => state.gameState);
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

export default connect()(App);
