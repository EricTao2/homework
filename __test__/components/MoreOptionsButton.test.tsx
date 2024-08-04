import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import MoreOptionsButton from '../../src/components/MoreOptionsButton';

// Mocking antd components
vi.mock('antd', () => {
  const Menu = ({children}: {children: React.ReactNode}) => <div>{children}</div>;
  Menu.Item = ({children}: {children: React.ReactNode}) => <div>{children}</div>;
  Menu.Divider = () => <div>Divider</div>;

  const Dropdown = ({overlay, trigger, children}: any) => (
    <div onClick={trigger.includes('click') ? overlay.props.onClick : undefined}>
      {children}
      {overlay}
    </div>
  );

  const Button = ({icon, style}: {icon: React.ReactNode; style: React.CSSProperties}) => (
    <button style={style}>{icon}</button>
  );

  return {Menu, Dropdown, Button};
});

// Mocking ant-design/icons
vi.mock('@ant-design/icons', () => {
  const Icon = ({children}: {children: React.ReactNode}) => <span>{children}</span>;
  return {
    WechatOutlined: Icon,
    ShareAltOutlined: Icon,
    LinkOutlined: Icon,
    StarOutlined: Icon,
    TagOutlined: Icon,
    PushpinOutlined: Icon,
    TeamOutlined: Icon,
    SaveOutlined: Icon,
    FileAddOutlined: Icon,
    HistoryOutlined: Icon,
    FileSyncOutlined: Icon,
    FileSearchOutlined: Icon,
    DownloadOutlined: Icon,
    LogoutOutlined: Icon,
    EllipsisOutlined: Icon
  };
});

describe('MoreOptionsButton', () => {
  it('renders button and opens menu on click', () => {
    render(<MoreOptionsButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('发送至聊天')).toBeInTheDocument();
    expect(screen.getByText('分享')).toBeInTheDocument();
    expect(screen.getByText('复制链接')).toBeInTheDocument();
    expect(screen.getByText('星标')).toBeInTheDocument();
    // Add more expectations as needed for the menu items
  });
});
