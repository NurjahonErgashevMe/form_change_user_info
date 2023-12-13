import { mock_user } from "./../utils/mocks/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/user";

const userSlices = createSlice({
  name: "user",
  initialState: {
    values: mock_user,
  },
  reducers: {
    changeData: (state, action: PayloadAction<{ values: Partial<IUser> }>) => {
      state.values = { ...state.values, ...action.payload.values };
    },
  },
});

export const { changeData } = userSlices.actions;

export default userSlices.reducer;
