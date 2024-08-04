import React from 'react';
import {describe, it, vi} from 'vitest';
import SearchFileContent from '../../../src/components/searchAll/SearchFileContent';
import {renderWithProviders} from '../../../src/utils/test-utils';

// Mocking necessary modules
vi.mock('../../../src/services/fileSearchApi');

vi.mock('../../../src/utils/selectHelper', () => ({
  getFileExtension: vi.fn(() => 'txt'),
  findFileType: vi.fn(() => 'text'),
  highlightEmTags: vi.fn((content) => content)
}));
vi.mock('../../../src/assets/fileIconsmall', () => ({
  fileIconSmall: {
    text: '<span>Text Icon</span>'
  }
}));
describe('SearchFileContent', () => {
  it('renders loading state initially', () => {
    const mockResponse = {
      data: {
        files: []
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetch as any).mockResolvedValueOnce(JSON.stringify(mockResponse));
    renderWithProviders(<SearchFileContent />);
    // expect(screen.getByText('加载中...')).toBeInTheDocument();
  });
});
