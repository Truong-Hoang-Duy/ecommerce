import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface CurrentUser {
  uid: string;
  displayName: string;
  email: string;
}

export interface AuthState {
  isLogin: boolean;
  logging?: boolean;
  currentUser?: CurrentUser;
}

const initialState: AuthState = {
  isLogin: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
      state.isLogin = true;
    },
    loginSuccess(state, action: PayloadAction<CurrentUser>) {
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },

    logout(state) {
      state.isLogin = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors state
export const selectIsLogin = (state: any) => state.auth.isLogin;
export const selectIsLogging = (state: any) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
