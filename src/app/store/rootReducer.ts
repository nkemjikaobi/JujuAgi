import { AnyAction, CombinedState, combineReducers, Reducer } from "@reduxjs/toolkit";

import auth, { AuthState } from "./auth";
import general, { GeneralState } from "./general";

export interface AppState {
  general: GeneralState;
  auth: AuthState;
}

const rootReducer: Reducer<CombinedState<AppState>, AnyAction> = combineReducers({
  general,
  auth,
});

export default rootReducer;
