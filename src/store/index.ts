import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import user from "./user";

export const store = configureStore({
  reducer: {
    user,
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
