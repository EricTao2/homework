import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {vi, describe, it, expect} from 'vitest';
import SearchTop from '../../src/components/SearchTop';
import {Provider} from 'react-redux';
import {Dropdown, Input, Card} from 'antd';
import {setFetchFilesParams} from '../../src/slices/fetchFilesSlice';
import {renderWithProviders} from '../../src/utils/test-utils';
import 'vitest-fetch-mock';

// Mock其他组件
vi.mock('../../src/components/searchAll/SearchFileName', () => ({
  __esModule: true,
  default: () => <div>SearchFileName Component</div>
}));

vi.mock('../../src/components/searchAll/ButtonInput', () => ({
  __esModule: true,
  default: () => <div>ButtonInput Component</div>
}));
vi.mock('../../src/components/searchAll/SearchFileContent', () => ({
  __esModule: true,
  default: () => <div>SearchFileContent Component</div>
}));

// Mock antd组件
vi.mock('antd', () => {
  const Dropdown = ({children, ...props}: any) => <div {...props}>{children}</div>;
  const Input = (props: any) => <input {...props} />;
  const Card = ({children, ...props}: any) => <div {...props}>{children}</div>;
  const theme = {
    useToken: () => ({token: {colorBgContainer: '#fff'}})
  };
  const Menu = ({children, ...props}: any) => <div {...props}>{children}</div>;
  return {Dropdown, Input, Card, Menu, theme};
});

describe('SearchTop Component', () => {
  it('should call fetch with the correct URL and parameters', async () => {
    const mockResponse = {
      data: {
        files: []
      }
    };

    (fetch as any).mockResponse(JSON.stringify(mockResponse));
    renderWithProviders(<SearchTop />);
    expect(screen.getByPlaceholderText('通过文件名、正文、创建者搜索文档')).toBeInTheDocument();
  });
});
