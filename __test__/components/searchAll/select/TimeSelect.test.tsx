import {render, screen, fireEvent} from '@testing-library/react';
import {Provider, useDispatch} from 'react-redux';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {TimeSelect} from '../../../../src/components/searchAll/select/TimeSelect'; // 替换为你的组件路径
import {processedTimeData} from '../../../../src/assets/timeData';
import {setFetchFilesParams} from '../../../../src/slices/fetchFilesSlice';
import {renderWithProviders} from '../../../../src/utils/test-utils';
import React from 'react';
import {RootState} from '../../../../src/slices';

const mockState: RootState = {
  fetchFiles: {
    offset: 0,
    count: 10,
    sort_by: 'date'
    // 添加其他必要的 state 属性
  }
} as RootState;

vi.mock('react-redux', async () => {
  const actualReactRedux = await vi.importActual('react-redux');
  return {
    ...actualReactRedux,
    useDispatch: vi.fn()
  };
});

describe('TimeSelect', () => {
  let store: any;
  let mockDispatch: any;
  let setSelectedTimesVisible: any;

  beforeEach(() => {
    store = mockState;
    mockDispatch = vi.fn();
    setSelectedTimesVisible = vi.fn();
    (useDispatch as any).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the table with time options', () => {
    renderWithProviders(<TimeSelect checkedIcon="✔️" setSelectedTimesVisible={setSelectedTimesVisible} />);
    expect(screen.getByText('最近1个月')).toBeInTheDocument();
  });

  it('should dispatch action on time option click', () => {
    renderWithProviders(<TimeSelect checkedIcon="✔️" setSelectedTimesVisible={setSelectedTimesVisible} />);

    const firstTime = processedTimeData[2];
    const firstTimeElement = screen.getByText(firstTime.title);

    fireEvent.click(firstTimeElement);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should toggle time selection', () => {
    renderWithProviders(<TimeSelect checkedIcon="✔️" setSelectedTimesVisible={setSelectedTimesVisible} />);

    const firstTime = processedTimeData[3];
    const firstTimeElement = screen.getByText(firstTime.title);

    // Initial click to select
    fireEvent.click(firstTimeElement);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    expect(firstTimeElement.innerHTML).toContain('✔️');

    // Select another time
    const secondTime = processedTimeData[4];
    const secondTimeElement = screen.getByText(secondTime.title);

    fireEvent.click(secondTimeElement);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    expect(secondTimeElement.innerHTML).toContain('✔️');
    expect(firstTimeElement.innerHTML).not.toContain('✔️');
  });
});
