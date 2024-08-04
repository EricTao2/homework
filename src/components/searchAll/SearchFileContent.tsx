import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Spin, Alert, Divider} from 'antd';
import {fetchFiles} from '../../services/fileSearchApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';
import styles from '../../styles/SearchFileContent.module.scss';
import {getFileExtension, findFileType, highlightEmTags} from '../../utils/selectHelper';
import {fileIconSmall} from '../../assets/fileIconsmall';

const SearchFileContent: React.FC = () => {
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
        setError('出错误');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Spin tip="加载中...">
          <div className={styles.loading} />
        </Spin>
      ) : error ? (
        <Alert message={error} type="error" />
      ) : (
        <Row gutter={[16, 16]}>
          {data
            .filter((file) => file?.highlight?.file_content)
            .map((file) => {
              const fileExtension = getFileExtension(file.fname);
              const fileType = findFileType(fileExtension);
              return (
                <Col xs={24} sm={12} md={8} key={file.id}>
                  <a href={file.link_url} target="_blank" rel="noopener noreferrer">
                    <Card className={styles.customCard} bordered={false}>
                      <div className={styles.cardFooter}>
                        <span className={styles.time}>{new Date(file.mtime * 1000).toLocaleDateString()}</span>
                        <Divider type="vertical" />
                        <span dangerouslySetInnerHTML={{__html: fileIconSmall[fileType]}} />
                      </div>
                      <h4>{file.fname}</h4>
                      <p
                        className={styles.fileContent}
                        dangerouslySetInnerHTML={{__html: highlightEmTags(file.highlight.file_content.join('...'))}}
                      />
                    </Card>
                  </a>
                </Col>
              );
            })}
        </Row>
      )}
    </div>
  );
};

export default SearchFileContent;
