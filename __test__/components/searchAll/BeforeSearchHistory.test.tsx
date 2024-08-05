import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import BeforeSearchHistory from '../../../src/components/searchAll/BeforeSearchHistory';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { RootState } from '../../../src/slices';
import {renderWithProviders} from '../../../src/utils/test-utils';

vi.mock('react-redux', async () => {
    const actualReactRedux = await vi.importActual('react-redux');
    return {
      ...actualReactRedux,
      useDispatch: vi.fn()
    };
  });
  const mockState: RootState = {
    fetchFiles: {
        searchname: '',
        start_time: -1,
        include_exts: '',
        filter_user_id: -1,
        scope: -1,
    }
  } as RootState;
describe('BeforeSearchHistory', () => {

  test('renders search history header', () => {
    renderWithProviders(<BeforeSearchHistory />)
    expect(screen.getByText('搜索历史')).toBeInTheDocument();
    expect(screen.getByText('清 除')).toBeInTheDocument();
  });

  test('loads search history from localStorage', () => {
    const mockHistory = [
      {
        sort_by: 'date',
        count: 10,
        search_file_content: false,
        search_file_name: true,
        searchname: 'test1',
        start_time: 1620000000,
        include_exts: 'pdf',
        filter_user_id: 1,
        scope: 2,
      },
      {
        sort_by: 'name',
        count: 20,
        search_file_content: true,
        search_file_name: false,
        searchname: 'test2',
        start_time: 1620000000,
        include_exts: 'docx',
        filter_user_id: 2,
        scope: 3,
      },
    ];

    localStorage.setItem('browsingHistory', JSON.stringify(mockHistory));

    renderWithProviders(<BeforeSearchHistory />)

    expect(screen.getByText('test1')).toBeInTheDocument();
    expect(screen.getByText('test2')).toBeInTheDocument();
  });

  test('clears search history', () => {
    const mockHistory = [
      {
        sort_by: 'date',
        count: 10,
        search_file_content: false,
        search_file_name: true,
        searchname: 'test1',
        start_time: 1620000000,
        include_exts: 'pdf',
        filter_user_id: 1,
        scope: 2,
      },
    ];

    localStorage.setItem('browsingHistory', JSON.stringify(mockHistory));

    renderWithProviders(<BeforeSearchHistory />)
    

    fireEvent.click(screen.getByText('清 除'));

    expect(localStorage.getItem('browsingHistory')).toBeNull();
    expect(screen.queryByText('test1')).not.toBeInTheDocument();
  });
});
