import { combineReducers } from '@reduxjs/toolkit';

import { api } from './api';
import authSlice from './slices/authSlice';

export const rootReducer = combineReducers({
  auth: authSlice,
  [api.reducerPath]: api.reducer,
});
