import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // Add your slices here
  },
})

// Types for dispatch and state
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
