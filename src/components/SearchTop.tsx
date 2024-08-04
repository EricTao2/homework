import React, {useCallback, useRef, useState} from 'react';
import {Card, Dropdown, Input, theme} from 'antd';
import '../styles/searchTop.scss';
import SearchFileName from './searchAll/SearchFileName';
import ButtonInput from './searchAll/ButtonInput';
import {debounce} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {setFetchFilesParams} from '../slices/fetchFilesSlice';
import SearchFileContent from './searchAll/SearchFileContent';
const SearchTop: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useSelector((state: RootState) => state.fetchFiles);

  const inputRef = useRef<string>('');
  const {
    token: {colorBgContainer}
  } = theme.useToken();
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean | ((prevState: boolean) => boolean)) => {
    setVisible(flag);
  };

  const handleSearch = (value: string) => {
    dispatch(setFetchFilesParams({searchname: value}));
  };
  // 使用 useCallback 包裹 debounce 函数以防止每次渲染都重新创建
  const debouncedSearch = useCallback(
    debounce((value: string) => handleSearch(value), 300),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value;
    debouncedSearch(e.target.value);
  };

  return (
    <Dropdown
      trigger={['click']}
      open={visible}
      onOpenChange={handleVisibleChange}
      placement="bottom"
      dropdownRender={() => (
        <Card title={<ButtonInput />} style={{width: '79.5vw'}}>
          {params.search_file_name ? <SearchFileName /> : <SearchFileContent />}
        </Card>
      )}
    >
      <Input
        placeholder="通过文件名、正文、创建者搜索文档"
        // prefix={
        //   <SearchOutlined
        //     style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}}
        //   />
        // }
        onChange={onChange}
        style={{backgroundColor: colorBgContainer}}
      />
    </Dropdown>
  );
};

export default SearchTop;
