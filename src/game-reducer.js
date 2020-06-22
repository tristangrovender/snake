const defaultState = {
    rowCount: 17,
    columnCount: 17,
    targetCircle: { x: 3, y: 15 },
    snake: {
        direction: "right",
        body: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]
    },
    frameRateInMs: 1000
};

export function executeGameFrame() {
    return {
        type: "GAME_FRAME",
        payload: {}
    };
}

export function setSnakeDirection(direction) {
    return {
        type: "SET_SNAKE_DIRECTION",
        payload: { direction }
    };
}

function getGridCells({ rowCount, columnCount }) {
    let gridCells = [];
    for (let y = 0; y < rowCount; y++) {
        for (let x = 0; x < columnCount; x++) {
            gridCells.push({ x: x, y: y });
        }
    }

    return gridCells;
}

function getRandomTargetCirclePosition(gameState) {
    const grid = getGridCells(gameState);
    const isCellNotInSnakeBody = cellInGrid => {
        // returns true or false (hint: use .some)
        const cellIsInSnakeBody = gameState.snake.body.some(cellInSnakeBody => {
            return (
                cellInSnakeBody.x === cellInGrid.x &&
                cellInSnakeBody.y === cellInGrid.y
            );
        });
        return !cellIsInSnakeBody;
    };
    const gridWithoutSnakeBody = grid.filter(isCellNotInSnakeBody);
    const randomIndex = Math.floor(Math.random() * gridWithoutSnakeBody.length);
    return gridWithoutSnakeBody[randomIndex];
}

function getHead(gameState) {
    return gameState.snake.body[gameState.snake.body.length - 1];
}

function moveSnake(gameState) {
    const {
        snake: { direction, body }
    } = gameState;
    const currentHead = getHead(gameState);
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
    return {
        ...gameState,
        snake: {
            ...gameState.snake,
            body: [...body.slice(1), newHead]
        }
    };
}

function growSnakeBody(lastFrameGameState, currentFrameGameState) {
    // TODO return currentFrameGameState.snake.body with an appended tail from lastFrameGameState
    return [
        lastFrameGameState.snake.body[0],
        ...currentFrameGameState.snake.body
    ];
}

function updateGameFrame(gameState) {
    const newGameState = moveSnake(gameState);

    const head = getHead(gameState);
    if (
        head.x === newGameState.targetCircle.x &&
        head.y === newGameState.targetCircle.y
    ) {
        console.log("Snake is on the target");
        return {
            ...newGameState,
            snake: {
                ...newGameState.snake,
                body: growSnakeBody(gameState, newGameState)
            },
            targetCircle: getRandomTargetCirclePosition(newGameState)
        };
    }

    return {
        ...newGameState
        // targetCircle: getRandomTargetCirclePosition(newGameState)
    };
}

export function gameStateReducer(state = defaultState, action) {
    switch (action.type) {
        case "GAME_FRAME": {
            return updateGameFrame(state);
        }
        case "SET_SNAKE_DIRECTION": {
            return {
                ...state,
                snake: {
                    ...state.snake,
                    direction: action.payload.direction
                }
            };
        }
        default: {
            return state;
        }
    }
}
