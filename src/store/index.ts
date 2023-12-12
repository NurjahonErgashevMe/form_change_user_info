import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import about from "./about";

export const store = configureStore({
  reducer: {
    about,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
