import React, { useEffect, useState } from "react";

import Grid from "./Grid";
import "./App.css";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

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
  const gameState = useSelector((state) => state.gameState);

  console.log("gameState", gameState);

  //   setTimeout(function () {
  //     setGameState({
  //       ...gameState,
  //       snake: {
  //         ...gameState.snake,
  //         body: moveSnake(gameState.snake),
  //       },
  //       refreshScreen: true,
  //     });
  //   }, 1000);

  const setDirection = (direction) => {
    console.log("set direction", direction);
    // setGameState({
    //   ...gameState,
    //   snake: {
    //     ...gameState.snake,
    //     direction,
    //   },
    // });
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

export default connect()(App);
