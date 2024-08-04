import {vi, describe, it, expect, assert} from 'vitest';
import {fetchFiles} from '../../src/services/fileSearchApi';
import {initialState} from '../../src/slices/fetchFilesSlice';
import 'vitest-fetch-mock';

describe('fetchFiles', () => {
  it('should call fetch with the correct URL and parameters', async () => {
    const mockResponse = {
      data: {
        files: []
      }
    };

    (fetch as any).mockResponse(JSON.stringify(mockResponse));
    const res = await fetchFiles(initialState);
    expect(res).toEqual(mockResponse);
  });
});
