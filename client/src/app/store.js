import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice.js';
import appReducer from '../features/appSlice.js';
import authReducer from '../features/auth/authSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    app: appReducer,
  },
});
