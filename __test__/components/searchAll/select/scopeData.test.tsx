import {render, screen, fireEvent} from '@testing-library/react';
import {Provider, useDispatch} from 'react-redux';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {ScopeSelect, processedScopeData} from '../../../../src/components/searchAll/select/ScopeSelect'; // 替换为你的组件路径
import {setFetchFilesParams} from '../../../../src/slices/fetchFilesSlice';
import React from 'react';
import {RootState} from '../../../../src/slices';
import {renderWithProviders} from '../../../../src/utils/test-utils';

vi.mock('react-redux', async () => {
  const actualReactRedux = await vi.importActual('react-redux');
  return {
    ...actualReactRedux,
    useDispatch: vi.fn()
  };
});
const mockState: RootState = {
  fetchFiles: {
    offset: 0,
    count: 10,
    sort_by: 'date'
    // 添加其他必要的 state 属性
  }
} as RootState;
describe('ScopeSelect', () => {
  let store: any;
  let mockDispatch: any;
  let setSelectedScopeVisible: any;

  beforeEach(() => {
    store = mockState;
    mockDispatch = vi.fn();
    setSelectedScopeVisible = vi.fn();
    (useDispatch as any).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the table with scope options', () => {
    renderWithProviders(<ScopeSelect checkedIcon="✔️" setSelectedScopeVisible={setSelectedScopeVisible} />);
    expect(screen.getByText('最近')).toBeInTheDocument();
  });

  it('should dispatch action on scope click', () => {
    renderWithProviders(<ScopeSelect checkedIcon="✔️" setSelectedScopeVisible={setSelectedScopeVisible} />);

    const firstScope = processedScopeData[2];
    const firstScopeElement = screen.getByText(firstScope.title);

    fireEvent.click(firstScopeElement);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    expect(setSelectedScopeVisible).toHaveBeenCalledWith(false);
  });
});
