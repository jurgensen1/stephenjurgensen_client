import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authSlice from './slices/authSlice';
import notecardSlice from './slices/noteCardSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    notecard: notecardSlice
  },
});
