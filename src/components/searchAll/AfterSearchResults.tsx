import React, {useEffect, useState} from 'react';
import {Col, List, Row} from 'antd';
import {fetchFiles} from '../../services/fileSearchApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';
import {fileIcon} from '../../assets/fileIcon';
import {fileTypeMapping} from '../../assets/fileTypeData';
import MoreOptionsButton from '../MoreOptionsButton';
const highlightEmTags = (inputString: string) => {
  // 使用正则表达式找到所有 <em> 标签，并添加内联样式
  return inputString.replace(/<em>(.*?)<\/em>/g, '<em style="background-color: yellow;">$1</em>');
};
function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : 'default';
}
function findFileType(extension: string): string {
  for (const [key, extensions] of fileTypeMapping) {
    if ((extensions as string[]).includes(extension)) {
      return key;
    }
  }
  return 'default'; // 如果没有找到匹配的文件类型，返回 null
}
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
        console.log("err", err)
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
        style={{
          height: '50vh' /* 固定高度，你可以根据需要调整 */,
          overflow: 'auto' /* 允许滚动 */,
          scrollbarWidth: 'thin'
        }}
        itemLayout="horizontal"
        dataSource={data}
        loading={loading}
        renderItem={(item) => {
          const fileExtension = getFileExtension(item.fname);
          const fileType = findFileType(fileExtension);
          return (
            <List.Item>
              <List.Item.Meta
                avatar={<div dangerouslySetInnerHTML={{__html: fileIcon[fileType]}} />} // 默认图标
                title={
                  <a href={item.link_url}>
                    {params.searchname != undefined && item.highlight?.file_name ? (
                      <div dangerouslySetInnerHTML={{__html: highlightEmTags(item.highlight.file_name[0])}} />
                    ) : (
                      item.fname
                    )}
                  </a>
                }
                description={
                  <Row>
                    <Col span={6}>
                      {item.extra._open != undefined
                        ? `你在 ${item.extra._open}打开过`
                        : item.path != '与我共享'
                          ? `你在 ${item.extra._mtime}更新过`
                          : `${item.creator.name} 在 ${item.extra._mtime}更新过`}
                    </Col>
                    <Col span={10}>{item.path == '与我共享' ? '我收到的文件' : item.path}</Col>
                    <Col span={7} style={{textAlign: 'right'}}>
                      {item.path == '与我共享' ? `${item.creator.name} 分享` : `${item.creator.name} 创建`}
                    </Col>
                    <Col span={1} style={{textAlign: 'right'}}>
                      <MoreOptionsButton />
                    </Col>
                  </Row>
                }
              />
            </List.Item>
          );
        }}
      />
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default AfterSearchResults;
