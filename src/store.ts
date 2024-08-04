// src/store.ts
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './slices';

const store = configureStore({
  reducer: rootReducer
});
export const testStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};
export type AppStore = ReturnType<typeof testStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
