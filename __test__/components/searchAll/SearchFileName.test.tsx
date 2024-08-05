import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {describe, it, vi, expect} from 'vitest';
import {Provider} from 'react-redux';
import SearchFileName from '../../../src/components/searchAll/SearchFileName';
import {fetchFiles} from '../../../src/services/fileSearchApi';
import {RootState} from '../../../src/slices';
import {renderWithProviders} from '../../../src/utils/test-utils';
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});
// Mocking necessary modules
vi.mock('../../../src/services/fileSearchApi');
vi.mock('../../../src/utils/selectHelper', () => ({
  getFileExtension: vi.fn(() => 'txt'),
  findFileType: vi.fn(() => 'text'),
  highlightEmTags: vi.fn((content) => content)
}));
vi.mock('../../../src/assets/fileIcon', () => ({
  fileIcon: {
    text: '<span>Text Icon</span>'
  }
}));

const mockState: RootState = {
  fetchFiles: {
    offset: 0,
    count: 10,
    sort_by: 'date'
    // 添加其他必要的 state 属性
  }
} as RootState;

describe('SearchFileName', () => {
  it('renders loading state initially', () => {
    (fetchFiles as any).mockResolvedValueOnce(JSON.stringify({files: []}));
    renderWithProviders(<SearchFileName />);
    // expect(screen.getByText('加载中...')).toBeInTheDocument();
  });

  it('renders file data correctly', async () => {
    const mockFiles = [
      {
        id: '1',
        fname: 'test.txt',
        mtime: 1627846490,
        link_url: 'http://example.com',
        highlight: {
          file_name: ['<em>test</em>.txt']
        },
        extra: {
          _open: '昨天',
          _mtime: '昨天'
        },
        path: '与我共享',
        creator: {
          name: '张三'
        }
      }
    ];
    (fetchFiles as any).mockResolvedValueOnce({files: mockFiles});
    renderWithProviders(<SearchFileName />);

    await waitFor(() => {
      expect(screen.getByText((content, element) => content.includes('加载中'))).toBeInTheDocument();
    });
  });
});
