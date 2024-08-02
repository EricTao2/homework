// src/slices/index.ts
import {combineReducers} from '@reduxjs/toolkit';
import fetchFilesReducer from './fetchFilesSlice';

const rootReducer = combineReducers({
  fetchFiles: fetchFilesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
