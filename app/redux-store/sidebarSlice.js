import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleMobileSidebar: (state) => {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen; //open mobile sidebar
    },
    closeMobileSidebar: (state) => {
      state.isMobileSidebarOpen = false; //close mobile sidebar
    },
  },
});

export const { toggleMobileSidebar, closeMobileSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
