import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAboutSlices {
  email: string;
  phone: string;
}

const aboutSlices = createSlice({
  name: "about",
  initialState: {
    values: { email: "nurjahon@gmail.com", phone: "+7 999 99-99-99" },
  },
  reducers: {
    changeData: (state, action: PayloadAction<{ values: IAboutSlices }>) => {
      state.values = action.payload.values;
    },
  },
});

export const { changeData } = aboutSlices.actions;

export default aboutSlices.reducer;
