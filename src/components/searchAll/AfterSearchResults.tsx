import React, {useEffect} from 'react';
import {Avatar, List, theme} from 'antd';
import {fetchFiles, selectParams} from '../../services/fileSearchApi';

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];

const SearchResults: React.FC = () => {
  const {
    token: {colorBgContainer}
  } = theme.useToken();
  useEffect(() => {
    fetchFiles(selectParams);
  }, []);
  return (
    <List
      style={{backgroundColor: colorBgContainer}}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  );
};

export default SearchResults;
