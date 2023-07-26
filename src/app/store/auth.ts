import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  currentUser: any;
}

const initialState: AuthState = {
  currentUser: null,
};

const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToInitialState: () => ({ ...initialState }),

    /**
     * Function to update the current user
     * @param {AuthState} state
     * @param {any} action
     */
    updateCurrentUser: (state: AuthState, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setToInitialState, updateCurrentUser } = authState.actions;

export default authState.reducer;
