import { createStore, combineReducers } from "redux";
import { gameStateReducer } from "./game-reducer";
export const store = createStore(
  combineReducers({ gameState: gameStateReducer })
);
export const dispatch = store.dispatch;
export const getState = () => store.getState();
