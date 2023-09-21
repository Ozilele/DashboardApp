import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const addNewEvent = createAsyncThunk("app/addNewEvent", async(event, thunkAPI) => {
  try {
    const { accessToken } = Cookies.get();
    const response = await axios.post("/admin/calendar", event, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response.data);
    return response.data;
  }
  catch(err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString(); 
    return thunkAPI.rejectWithValue(message); // send a message as a payload
  }
});

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
    currentLink: '',
    appliedFilters: [],
    isSidebarShown: false,
    modalData: null,
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
    resetSuccess: (state) => {
      state.message = "";
      state.isSuccess = false;
    },
    applyFilter: (state, action) => {
      state.appliedFilters.push(action.payload);
    },
    deleteFilter: (state, action) => {
      state.appliedFilters = state.appliedFilters.filter((item) => item !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewEvent.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = "Successfully inserted new event";
      })
      .addCase(addNewEvent.rejected, (state, action) => {
        state.isSuccess = false;
        state.message = action.payload;
      })
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

export const { toggleSidebar, applyFilter, deleteFilter, toggleModalWindow, setModalData, resetSuccess, resetFirstRender } = appSlice.actions;
export const selectModal = (state) => state.app.isModalOpen;
export const selectModalData = (state) => state.app.modalData;
export const selectSidebar = (state) => state.app.isSidebarShown;
export const selectApp = (state) => state.app;

export default appSlice.reducer;