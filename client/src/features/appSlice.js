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
    console.log(message); 
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
    isSidebarRolled: false,
    modalData: null,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.isSidebarRolled = !state.isSidebarRolled;
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

export const { toggleSidebar, toggleModalWindow, setModalData, resetSuccess } = appSlice.actions;
export const selectModal = (state) => state.app.isModalOpen;
export const selectModalData = (state) => state.app.modalData;
export const selectSidebar = (state) => state.app.isSidebarRolled;

export const selectApp = (state) => state.app;
export default appSlice.reducer;