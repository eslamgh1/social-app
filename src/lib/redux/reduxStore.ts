import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';


export const myStore = configureStore({
  
  reducer: {
    //eslam: authReducer
    authReducer

  },
})

export type StoreType = ReturnType<typeof myStore.getState>