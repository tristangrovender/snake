import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

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

function gameStateReducer(state = defaultState, action) {
  console.log("reducer was called!");
  return state;
}

const store = createStore(combineReducers({ gameState: gameStateReducer }));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
