import { createSlice } from "@reduxjs/toolkit";

const menuToggle = createSlice({
    name: 'menuToggle',
    initialState: {
        showMenu: true
    },
    reducers: {
        toggleMenu(state, action) {
            state.showMenu = action.payload
        }
    }
})

export const {
    toggleMenu
} = menuToggle.actions;

export default menuToggle.reducer;