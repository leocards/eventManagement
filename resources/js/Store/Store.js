import { configureStore } from '@reduxjs/toolkit'
import windowSize from './windowSize'
import menuToggle from './menuToggle'
import securityNotice from './securityNotice'

export const store = configureStore({
    reducer: {
        windowWidth: windowSize,
        menuToggle: menuToggle,
        securityNotice: securityNotice
    }
})