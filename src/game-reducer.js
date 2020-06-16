const defaultState = {
  rowCount: 17,
  columnCount: 17,
  targetCircle: { x: 3, y: 15 },
  snake: {
    direction: "right",
    body: [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ],
  },
  frameRateInMs: 1000,
};

export function executeGameFrame() {
  return {
    type: "GAME_FRAME",
    payload: {},
  };
}

export function setSnakeDirection(direction) {
  return {
    type: "SET_SNAKE_DIRECTION",
    payload: { direction },
  };
}

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

export function gameStateReducer(state = defaultState, action) {
  console.log("reducer was called!");
  switch (action.type) {
    case "GAME_FRAME": {
      return {
        ...state,
        snake: {
          ...state.snake,
          body: moveSnake(state.snake),
        },
      };
    }
    case "SET_SNAKE_DIRECTION": {
      return {
        ...state,
        snake: {
          ...state.snake,
          direction: action.payload.direction,
        },
      };
    }
    default: {
      return state;
    }
  }
}
