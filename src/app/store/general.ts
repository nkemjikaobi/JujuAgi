import { createSlice } from "@reduxjs/toolkit";

export interface GeneralState {}

const initialState: GeneralState = {};

const generalState = createSlice({
  name: "general",
  initialState,
  reducers: {
    setToInitialState: () => ({ ...initialState }),
  },
});

export const { setToInitialState } = generalState.actions;

export default generalState.reducer;
