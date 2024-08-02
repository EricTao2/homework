// src/components/SearchResults.tsx
import React from 'react';
import {List, theme} from 'antd';

interface SearchResultsProps {
  results: any[];
}

const BeforeSearchTemp: React.FC<SearchResultsProps> = ({results}) => {
  const {
    token: {colorBgContainer}
  } = theme.useToken();
  return (
    <List
      style={{backgroundColor: colorBgContainer}}
      dataSource={results}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default BeforeSearchTemp;
