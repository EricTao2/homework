import {Button, List, theme} from 'antd';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../slices';
import {AppDispatch} from '../../store';
import {setFetchFilesParams} from '../../slices/fetchFilesSlice';

// 定义接口
interface SearchHistoryItem {
  sort_by: string;
  count: number;
  search_file_content: boolean;
  search_file_name: boolean;
  searchname: string;
  start_time: number;
  include_exts: string;
  filter_user_id: number;
  scope: number;
}

const BeforeSearchHistory: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    token: {colorBgContainer}
  } = theme.useToken();
  const params = useSelector((state: RootState) => state.fetchFiles);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    console.log('开始做历史啦', params);
    if (
      params.searchname !== '' ||
      params.start_time !== -1 ||
      params.include_exts !== '' ||
      params.filter_user_id !== -1 ||
      params.scope !== -1
    ) {
      // Handle case where params are present
    } else {
      const storedHistory = localStorage.getItem('browsingHistory');
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    }
  }, [params]);

  const handleItemClick = (searchname: string) => {
    dispatch(setFetchFilesParams({searchname: searchname}));
  };

  const clearHistory = () => {
    localStorage.removeItem('browsingHistory');
    setSearchHistory([]);
  };

  return (
    <div style={{backgroundColor: colorBgContainer, borderRadius: '8px', height: '65vh'}}>
      <List
        header={
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0px', fontSize: '14px'}}>
            <h3 style={{margin: 0, fontSize: '14px'}}>搜索历史</h3>
            <Button onClick={clearHistory} size="small">
              清除
            </Button>
          </div>
        }
        dataSource={searchHistory}
        renderItem={(item) => (
          <List.Item
            onClick={() => handleItemClick(item.searchname)}
            style={{cursor: 'pointer', padding: '10px 20px', borderBottom: 'none'}}
          >
            <List.Item.Meta
              avatar={
                <span role="img" aria-label="clock">
                  ⏰
                </span>
              }
              title={item.searchname}
            />
          </List.Item>
        )}
        bordered={false}
      />
    </div>
  );
};

export default BeforeSearchHistory;
