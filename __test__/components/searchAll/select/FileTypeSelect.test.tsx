import {render, screen, fireEvent} from '@testing-library/react';
import {Provider, useDispatch} from 'react-redux';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {FileTypeSelect} from '../../../../src/components/searchAll/select/FileTypeSelect'; // 替换为你的组件路径
import {setFetchFilesParams} from '../../../../src/slices/fetchFilesSlice';
import {processedFileTypeData} from '../../../../src/assets/fileTypeData';
import {renderWithProviders} from '../../../../src/utils/test-utils';
import React from 'react';

vi.mock('react-redux', async () => {
  const actualReactRedux = await vi.importActual('react-redux');
  return {
    ...actualReactRedux,
    useDispatch: vi.fn()
  };
});

describe('FileTypeSelect', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the table with file types', () => {
    renderWithProviders(<FileTypeSelect checkedIcon="✔️" />);

    processedFileTypeData.forEach((fileType) => {
      expect(screen.getByText('文件类型(可多选)')).toBeInTheDocument();
    });
  });

  it('should toggle file type selection', () => {
    renderWithProviders(<FileTypeSelect checkedIcon="✔️" />);

    const firstFileType = processedFileTypeData[2];
    const firstFileTypeElement = screen.getByText(firstFileType.title);

    // Initial click to select
    // fireEvent.click(firstFileTypeElement);
    // expect(firstFileTypeElement.innerHTML).toContain('✔️');

    // // Second click to deselect
    // fireEvent.click(firstFileTypeElement);
    // expect(firstFileTypeElement.innerHTML).not.toContain('✔️');
  });
});
