import { configureStore } from '@reduxjs/toolkit'
import windowSize from './windowSize'
import menuToggle from './menuToggle'

export const store = configureStore({
    reducer: {
        windowWidth: windowSize,
        menuToggle: menuToggle
    }
})