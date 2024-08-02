import React, {useEffect, useState} from 'react';
import {Avatar, List} from 'antd';
import {fetchFiles} from '../../services/fileSearchApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';

const AfterSearchResults: React.FC = () => {
  const params = useSelector((state: RootState) => state.fetchFiles);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFiles(params);
        setData(result.files);
      } catch (err) {
        setError('qingqiuchucuola');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        loading={loading}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://placekitten.com/40/40" />} // 默认图标
              title={<a href={item.link_url}>{item.fname}</a>}
              description={`Updated at ${new Date(item.mtime * 1000).toLocaleString()} by ${item.creator.name}`}
            />
          </List.Item>
        )}
      />
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default AfterSearchResults;
