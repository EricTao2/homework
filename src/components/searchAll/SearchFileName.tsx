import React, {useEffect, useState} from 'react';
import {Col, List, Row} from 'antd';
import {fetchFiles} from '../../services/fileSearchApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';
import {fileIcon} from '../../assets/fileIcon';
import MoreOptionsButton from '../MoreOptionsButton';
import {getFileExtension, findFileType, highlightEmTags} from '../../utils/selectHelper';
import styles from '../../styles/SearchFileName.module.scss';

const SearchFileName: React.FC = () => {
  const params = useSelector((state: RootState) => state.fetchFiles);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        setError('出错误');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return (
    <List
      className={styles.listContainer}
      itemLayout="horizontal"
      dataSource={data}
      loading={loading}
      renderItem={(item) => {
        const fileExtension = getFileExtension(item.fname);
        const fileType = findFileType(fileExtension);
        return (
          <List.Item className={styles.listItem}>
            <List.Item.Meta
              avatar={<div className="avatar-wrapper" dangerouslySetInnerHTML={{__html: fileIcon[fileType]}} />}
              title={
                <a href={item.link_url} className={styles.fileLink}>
                  {params.searchname != undefined && item.highlight?.file_name ? (
                    <div dangerouslySetInnerHTML={{__html: highlightEmTags(item.highlight.file_name[0])}} />
                  ) : (
                    item.fname
                  )}
                </a>
              }
              description={
                <Row className={styles.descriptionRow}>
                  <Col span={6}>
                    {item.extra._open != undefined
                      ? `你在 ${item.extra._open}打开过`
                      : item.path != '与我共享'
                        ? `你在 ${item.extra._mtime}更新过`
                        : `${item.creator.name} 在 ${item.extra._mtime}更新过`}
                  </Col>
                  <Col span={10}>{item.path == '与我共享' ? '我收到的文件' : item.path}</Col>
                  <Col span={7} className={styles.creatorInfo}>
                    {item.path == '与我共享' ? `${item.creator.name} 分享` : `${item.creator.name} 创建`}
                  </Col>
                  <Col span={1} className={styles.optionsButton}>
                    <MoreOptionsButton />
                  </Col>
                </Row>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};

export default SearchFileName;
