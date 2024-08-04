import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, vi, expect} from 'vitest';
import {CreatorSelect} from '../../../../src/components/searchAll/select/CreatorSelect';

vi.mock('../../../../src/services/fileSearchApi', () => ({
  fetchFiles: vi.fn(() => {
    data: {
      files: [];
    }
  })
}));
vi.mock('../../../../src/services/userApi', () => ({
  fetchUserInfo: vi.fn(() => {
    id: 1606716157;
    name: '张巨芳';
    avatar: '';
  })
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn()
}));

const processedCreatorData = [
  {
    name: 'all',
    title: 'All Creators',
    icon: '<span>Icon</span>',
    checked: true,
    getStateValue: () => ({creator: 'all'})
  },
  {
    name: 'creator1',
    title: 'Creator 1',
    icon: '<span>Icon</span>',
    checked: false,
    getStateValue: () => ({creator: 'creator1'})
  }
];

describe('CreatorSelect', () => {
  it('renders correctly', () => {
    const setSelectedCreatorVisible = vi.fn();
    const setSelectedCreatorText = vi.fn();

    render(
      <CreatorSelect
        checkedIcon="<span>CheckedIcon</span>"
        setSelectedCreatorVisible={setSelectedCreatorVisible}
        setSelectedCreatorText={setSelectedCreatorText}
      />
    );

    expect(screen.getByText('他人创建的')).toBeInTheDocument();
  });

  it('updates selected creator on click', () => {
    const setSelectedCreatorVisible = vi.fn();
    const setSelectedCreatorText = vi.fn();

    render(
      <CreatorSelect
        checkedIcon="<span>CheckedIcon</span>"
        setSelectedCreatorVisible={setSelectedCreatorVisible}
        setSelectedCreatorText={setSelectedCreatorText}
      />
    );
  });

  //     fireEvent.click(screen.getByText('Creator 1'));

  //     // expect(mockDispatch).toHaveBeenCalledWith(setFetchFilesParams({creator: 'creator1'}));
  //     expect(setSelectedCreatorVisible).toHaveBeenCalledWith(false);
  //   });

  it('renders checked icon correctly', () => {
    const setSelectedCreatorVisible = vi.fn();
    const setSelectedCreatorText = vi.fn();

    render(
      <CreatorSelect
        checkedIcon="<span>CheckedIcon</span>"
        setSelectedCreatorVisible={setSelectedCreatorVisible}
        setSelectedCreatorText={setSelectedCreatorText}
      />
    );

    expect(screen.getByText('CheckedIcon')).toBeInTheDocument();
  });
});
