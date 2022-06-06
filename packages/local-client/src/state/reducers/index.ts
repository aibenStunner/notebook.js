import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";
import bundlesReducer from "./bundlesReducer";
import settingsReducer from "./settingsReducer";

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
  settings: settingsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
