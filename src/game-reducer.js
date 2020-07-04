const defaultState = {
    rowCount: 17,
    columnCount: 17,
    targetCircle: { x: 3, y: 15 },
    snake: {
        direction: "right",
        body: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]
    },
    frameRateInMs: 1000,
    isGameRunning: false
};

export function startGame() {
    console.log("space bar was pressed!");
    return {
        type: "START_GAME",
        payload: {}
    };
}

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

function moveSnakeHead(gameState) {
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
    return [
        lastFrameGameState.snake.body[0],
        ...currentFrameGameState.snake.body
    ];
}

function hasSnakeCrossedOverItself(snakeBody) {
    console.log(snakeBody);
    const head = snakeBody[0];
    // see if the snake head matches any of the other coordinates in the body
    const snakeBodyWithoutHead = snakeBody.slice(1);
    const snakeCheck = snakeBodyWithoutHead.some(coordinates => {
        return head.x === coordinates.x && coordinates.y === head.y;
    });
    return snakeCheck;
}

function isGameOver(gameState) {
    const head = getHead(gameState);
    if (
        head.x > gameState.columnCount - 1 ||
        head.y > gameState.rowCount - 1 ||
        head.x < 0 ||
        head.y < 0
    ) {
        return true;
    }

    if (hasSnakeCrossedOverItself(gameState.snake.body)) {
        return true;
    }

    return false;
}

function updateGameFrame(gameState) {
    const newGameState = moveSnakeHead(gameState);
    if (isGameOver(newGameState)) {
        return {
            ...defaultState,
            isGameRunning: false
        };
    }

    const oldHead = getHead(gameState);
    if (
        oldHead.x === newGameState.targetCircle.x &&
        oldHead.y === newGameState.targetCircle.y
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
        case "START_GAME": {
            return {
                ...state,
                isGameRunning: true
            };
        }
        default: {
            return state;
        }
    }
}
