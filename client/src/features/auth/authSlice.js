import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./authService";

// Getting user from local Storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null, // just for getting data about the user
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const register = createAsyncThunk("auth/register", async(user, thunkAPI) => {
  try {
    const registerResponse = await registerUser(user);
    return registerResponse;
  } 
  catch(err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString(); 
    return thunkAPI.rejectWithValue(message); // send a message as a payload
  }
});

export const logout = createAsyncThunk("auth/logout", async() => {
  await logoutUser();
});

export const login = createAsyncThunk("auth/login", async(user, thunkAPI) => {
  try {
    const loginResponse = await loginUser(user);
    return loginResponse;
  } 
  catch(err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString(); 
    console.log(message);
    return thunkAPI.rejectWithValue(message); // send a message as a payload
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { // these are not going to be asynchronous
    reset: (state) => { // function used when the user registers
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    }
  },
  extraReducers: (builder) => { // holding couple functions to handle the return from the API call, handling actions created by asyncThunk
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  }
});

export const selectUser = (state) => state.auth.user;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
