// src/slices/fetchFilesSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FetchFilesParams} from '../types/fileSearchType';

export const initialState: FetchFilesParams = {
  sort_by: 'time',
  count: 20,
  search_file_content: false,
  search_file_name: true,

  searchname: '',
  start_time: -1,
  include_exts: '', //根据文件类型搜索
  filter_user_id: -1, //根据创建人搜索
  scope: -1, //根据文件位置搜索
  include_ext_groups: undefined
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
