import { toggleMenu } from './menuToggle';
import { createSlice } from "@reduxjs/toolkit";

const windowSize = createSlice({
    name: 'windowSize',
    initialState: { size: window.innerWidth },
    reducers: {
        setWindowSize(state, action) {
            state.size = action.payload;
        }
    }
})

export const {
    setWindowSize
} = windowSize.actions;

export default windowSize.reducer;

export const listenToWindowSize = () => dispatch => {
    let timeoutId;

    const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            dispatch(setWindowSize(window.innerWidth));
        }); // Adjust the debounce delay as needed
    };

    window.addEventListener('resize', handleResize);

    // Dispatch initial window size
    dispatch(setWindowSize(window.innerWidth));

    return () => {
        window.removeEventListener('resize', handleResize);
    };
};