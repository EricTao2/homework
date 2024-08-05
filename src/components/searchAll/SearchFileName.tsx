import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, List, Row, Spin } from 'antd';
import { fetchFiles } from '../../services/fileSearchApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../slices';
import { fileIcon } from '../../assets/fileIcon';
import MoreOptionsButton from '../MoreOptionsButton';
import { getFileExtension, findFileType, highlightEmTags } from '../../utils/selectHelper';
import styles from '../../styles/SearchFileName.module.scss';
import { throttle } from 'lodash';
import { FixedSizeList as VirtualList } from 'react-window';

const SearchFileName: React.FC = () => {
  const params = useSelector((state: RootState) => state.fetchFiles);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const listRef = useRef<any>();

  const loadMoreData = useCallback(
    throttle(async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFiles({ ...params, offset });
        if (result.files.length === 0) {
          setHasMore(false);
        } else {
          setData((prev) => [...prev, ...result.files]);
          setOffset((prev) => prev + 20);
        }
      } catch (err) {
        setError('出错误');
      } finally {
        setLoading(false);
      }
    }, 200),
    [params, loading, hasMore, offset]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFiles({ ...params, offset: 0 });
        setData(result.files);
        setOffset(20);
        setHasMore(result.files.length > 0);
        if (listRef.current) {
          listRef.current.scrollTo(0);
        }
      } catch (err) {
        setError('出错误');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return (
    <div className={styles.listContainer}>
      <VirtualList
        className={styles.virtualList}
        ref={listRef}
        height={600}
        itemCount={data.length + (hasMore ? 1 : 0) + (hasMore ? 0 : 1)} // 增加额外的提示项
        itemSize={100}
        width="100%"
        onItemsRendered={({ visibleStopIndex }) => {
          if (visibleStopIndex >= data.length - 1 && hasMore) {
            loadMoreData();
          }
        }}
      >
        {({ index, style }) => {
          const item = data[index];
          if (!item && hasMore) {
            return (
              <Spin tip="加载中...">
                <div className={styles.loading} />
              </Spin>
            );
          }

          if (!item && !hasMore) {
            return (
              <div style={style} key={index} className={styles.noMoreFiles}>
                没有更多文件
              </div>
            );
          }

          const fileExtension = getFileExtension(item.fname);
          const fileType = findFileType(fileExtension);
          return (
            <div style={style} key={index}>
              <List.Item className={styles.listItem}>
                <div className={styles.icon} dangerouslySetInnerHTML={{ __html: fileIcon[fileType] }} />
                <div style={{ flex: 1 }}>
                  <div>
                    <a href={item.link_url} className={styles.link}>
                      {params.searchname !== undefined && item.highlight?.file_name ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: highlightEmTags(item.highlight.file_name[0]) }}
                        />
                      ) : (
                        item.fname
                      )}
                    </a>
                  </div>
                  <div>
                    <Row className={styles.descriptionRow}>
                      <Col span={6}>
                        {item.extra._open !== undefined
                          ? `你在 ${item.extra._open}打开过`
                          : item.path !== '与我共享'
                          ? `你在 ${item.extra._mtime}更新过`
                          : `${item.creator.name} 在 ${item.extra._mtime}更新过`}
                      </Col>
                      <Col span={10}>{item.path === '与我共享' ? '我收到的文件' : item.path}</Col>
                      <Col span={7} className={styles.textRight}>
                        {item.path === '与我共享' ? `${item.creator.name} 分享` : `${item.creator.name} 创建`}
                      </Col>
                      <Col span={1} className={styles.textRight}>
                        <MoreOptionsButton />
                      </Col>
                    </Row>
                  </div>
                </div>
              </List.Item>
            </div>
          );
        }}
      </VirtualList>
    </div>
  );
};

export default SearchFileName;
