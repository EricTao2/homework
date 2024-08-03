// src/slices/fetchFilesSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FetchFilesParams} from '../types/fileSearchType';

const initialState: FetchFilesParams = {
  offset: 0,
  count: 5,
  sort_by: 'time',
};

const fetchFilesSlice = createSlice({
  name: 'fetchFiles',
  initialState,
  reducers: {
    setFetchFilesParams(state, action: PayloadAction<Partial<FetchFilesParams>>) {
      console.log("neReduxState:", {...state, ...action.payload})
      return {...state, ...action.payload};
    },
    resetFetchFilesParams() {
      return initialState;
    }
  }
});

export const {setFetchFilesParams, resetFetchFilesParams} = fetchFilesSlice.actions;

export default fetchFilesSlice.reducer;
