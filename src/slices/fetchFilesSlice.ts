// src/slices/fetchFilesSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FetchFilesParams} from '../types/fileSearchType';

export const initialState: FetchFilesParams = {
  sort_by: 'time',
  count:20,
  search_file_content: false,
  search_file_name: true
};

const fetchFilesSlice = createSlice({
  name: 'fetchFiles',
  initialState,
  reducers: {
    setFetchFilesParams(state, action: PayloadAction<Partial<FetchFilesParams>>) {
      console.log('neReduxState:', {...state, ...action.payload});
      return {...state, ...action.payload};
    },
    resetFetchFilesParams() {
      return initialState;
    }
  }
});

export const {setFetchFilesParams, resetFetchFilesParams} = fetchFilesSlice.actions;

export default fetchFilesSlice.reducer;
