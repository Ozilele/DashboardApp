import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const deleteEvent = createAsyncThunk("app/deleteEvent", async(id, thunkAPI) => {
  try {
    const { accessToken } = Cookies.get();
    const URL = `/admin/calendar/${id}`;
    return await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
  catch(err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); // send a message as a payload
  }
});

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isSuccess: false,
    message: "",
    isModalOpen: false,
    currentLink: "Home",
    appliedFilters: [],
    isSidebarShown: false,
    modalData: null,
    currTheme: 'light',
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.isSidebarShown = !state.isSidebarShown;
    },
    toggleModalWindow: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
    setAddEventState: (state, action) => {
      state.isSuccess = true;
      state.message = "Successfully inserted new event";
    },
    setCurrentLink: (state, action) => {
      state.currentLink = action.payload;
    },
    resetSuccess: (state) => {
      state.message = "";
      state.isSuccess = false;
    },
    applyFilter: (state, action) => {
      state.appliedFilters.push(action.payload);
    },
    deleteFilter: (state, action) => {
      state.appliedFilters = state.appliedFilters.filter((item) => item !== action.payload);
    },
    toggleAppTheme: (state, action) => {
      state.currTheme = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = "Successfully deleted an event";
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isSuccess = false;
        state.message = action.payload;
      })
  }
});

export const { toggleSidebar, applyFilter, deleteFilter, toggleModalWindow, setModalData, setAddEventState, resetSuccess, toggleAppTheme, setCurrentLink } = appSlice.actions;
export const selectModal = (state) => state.app.isModalOpen;
export const selectModalData = (state) => state.app.modalData;
export const selectSidebar = (state) => state.app.isSidebarShown;
export const selectAppTheme = (state) => state.app.currTheme;
export const selectCurrentLink = (state) => state.app.currentLink;
export const selectApp = (state) => state.app;

export default appSlice.reducer;