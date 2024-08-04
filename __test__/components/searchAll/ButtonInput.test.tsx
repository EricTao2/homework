import {render, screen, fireEvent} from '@testing-library/react';
import {Provider, useDispatch} from 'react-redux';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import ButtonInput from '../../../src/components/searchAll/ButtonInput'; // 替换为你的组件路径
// import {setFetchFilesParams} from '../../../src/slices/fetchFilesSlice';
import React from 'react';
import {renderWithProviders} from '../../../src/utils/test-utils';

vi.mock('../../../src/services/fileSearchApi', () => ({
  fetchFiles: vi.fn(() => {
    data: {
      files: [];
    }
  })
}));
vi.mock('../../../src/services/userApi', () => ({
  fetchUserInfo: vi.fn(() => {
    id: 1606716157;
    name: '张巨芳';
    avatar: '';
  })
}));
vi.mock('react-redux', async () => {
  const actualReactRedux = await vi.importActual('react-redux');
  return {
    ...actualReactRedux,
    useDispatch: vi.fn()
  };
});

describe('ButtonInput', () => {
  let mockDispatch: any;

  beforeEach(() => {
    mockDispatch = vi.fn();
    (useDispatch as any).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the radio buttons and dropdowns', () => {
    renderWithProviders(<ButtonInput />);

    expect(screen.getByText('文件名')).toBeInTheDocument();
    expect(screen.getByText('正文')).toBeInTheDocument();
  });

  //   it('should dispatch action on radio button change', () => {
  //     renderWithProviders(<ButtonInput />);

  //     const fileContentRadio = screen.getByText('正文').closest('input');
  //     fireEvent.click(fileContentRadio);

  //     expect(mockDispatch).toHaveBeenCalledWith(
  //       setFetchFilesParams({search_file_name: false, search_file_content: true})
  //     );
  //   });

  //   it('should open and close dropdowns on button click', () => {
  //     renderWithProviders(<ButtonInput />);

  //     const typeButton = screen.getByText('类型').closest('button');
  //     fireEvent.click(typeButton);
  //     expect(screen.getByText('类型').closest('button')).toHaveClass('antDropdownOpen');

  //     fireEvent.click(typeButton);
  //     expect(screen.getByText('类型').closest('button')).not.toHaveClass('antDropdownOpen');
  //   });
});
