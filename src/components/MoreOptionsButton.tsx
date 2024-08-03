import React from 'react';
import {Menu, Dropdown, Button} from 'antd';
import {
  WechatOutlined,
  ShareAltOutlined,
  LinkOutlined,
  StarOutlined,
  TagOutlined,
  PushpinOutlined,
  TeamOutlined,
  SaveOutlined,
  FileAddOutlined,
  HistoryOutlined,
  FileSyncOutlined,
  FileSearchOutlined,
  DownloadOutlined,
  LogoutOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item key="1" icon={<WechatOutlined />}>
      发送至聊天
    </Menu.Item>
    <Menu.Item key="2" icon={<ShareAltOutlined />}>
      分享
    </Menu.Item>
    <Menu.Item key="3" icon={<LinkOutlined />}>
      复制链接
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="4" icon={<StarOutlined />}>
      星标
    </Menu.Item>
    <Menu.Item key="5" icon={<TagOutlined />}>
      添加标签
    </Menu.Item>
    <Menu.Item key="6" icon={<PushpinOutlined />}>
      固定至「常用」
    </Menu.Item>
    <Menu.Item key="7" icon={<TeamOutlined />}>
      共享模板给他人
    </Menu.Item>
    <Menu.Item key="8" icon={<SaveOutlined />}>
      另存为
    </Menu.Item>
    <Menu.Item key="9" icon={<FileAddOutlined />}>
      添加快捷方式到
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="10" icon={<HistoryOutlined />}>
      历史版本
    </Menu.Item>
    <Menu.Item key="11" icon={<FileSyncOutlined />}>
      关注文档更新
    </Menu.Item>
    <Menu.Item key="12" icon={<FileSearchOutlined />}>
      打开文件位置
    </Menu.Item>
    <Menu.Item key="13" icon={<DownloadOutlined />}>
      下载
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="14" icon={<LogoutOutlined />}>
      删除
    </Menu.Item>
  </Menu>
);

const MoreOptionsButton = () => {
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} style={{border: 'none', boxShadow: 'none'}} />
    </Dropdown>
  );
};

export default MoreOptionsButton;
