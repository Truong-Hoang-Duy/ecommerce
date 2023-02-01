import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import createSageMiddleware from 'redux-saga';
import RootSaga from './rootSaga';

const sagaMiddleware = createSageMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(sagaMiddleware),
});

sagaMiddleware.run(RootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
