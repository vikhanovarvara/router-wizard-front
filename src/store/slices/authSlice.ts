import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { authApi } from 'store/api/authApi';
import { currentUserApi } from 'store/api/currentUserApi';

import { User } from 'types/entities/User';

export interface AuthState {
  currentUser: User | null;
  isAuth: boolean;
  isFetching: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isAuth: false,
  isFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.signIn.matchFulfilled, state => {
        state.isAuth = true;
      })
      .addMatcher(currentUserApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
        state.isAuth = true;
        state.currentUser = action.payload;
      })
      .addMatcher(currentUserApi.endpoints.getCurrentUser.matchRejected, (state, action) => {
        if (action.error.name === 'ConditionError') return;
        state.isAuth = false;
        state.currentUser = null;
      })
      .addMatcher(authApi.endpoints.signOut.matchFulfilled, state => {
        state.isAuth = false;
        state.currentUser = null;
      });
  },
});

export const { setCurrentUser, setIsAuth, setIsFetching } = authSlice.actions;

export default authSlice.reducer;
