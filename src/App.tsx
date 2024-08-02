import React from 'react';
import {Layout, List} from 'antd';
import styles from './styles/App.module.scss'; // 引入 Sass 文件
import SearchTop from './components/SearchTop';

const {Content} = Layout;

const App: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <SearchTop />
      <Content className={styles.content}></Content>
    </Layout>
  );
};

export default App;
