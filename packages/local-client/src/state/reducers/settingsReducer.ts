import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export interface SettingsState {
  themeMode: string;
}

const initialState: SettingsState = {
  themeMode: "device",
};

const reducer = produce(
  (state: SettingsState = initialState, action: Action): SettingsState => {
    switch (action.type) {
      case ActionType.SETTINGS:
        state.themeMode = action.payload.themeMode;
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
