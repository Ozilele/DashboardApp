import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  } 
});

export const { getUserInfo } = userSlice.actions;
export const selectUser = (state) => state.user.userInfo;

export default userSlice.reducer;