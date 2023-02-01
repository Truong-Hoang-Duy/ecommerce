import { PayloadAction } from '@reduxjs/toolkit';
import { fork, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  console.log('log in', payload);
}

function* handleLogout() {
  console.log('log out');
}

function* wathLoginFlow() {
  const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
  yield fork(handleLogin, action.payload);

  yield take(authActions.logout.type);
  yield fork(handleLogout);
}

export default function* authSaga() {
  yield fork(wathLoginFlow);
}
