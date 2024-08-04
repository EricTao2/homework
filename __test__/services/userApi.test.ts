import {vi, describe, it, expect} from 'vitest';
import {fetchUserInfo} from '../../src/services/userApi'; // 替换为你的实际路径
import 'vitest-fetch-mock';

describe('fetchUserInfo', () => {
  it('should call fetch with the correct URL and parameters', async () => {
    const mockResponse = {id: 1, name: 'John Doe'};

    (fetch as any).mockResponseOnce(JSON.stringify(mockResponse));

    const res = await fetchUserInfo();
    expect(res).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('https://365.kdocs.cn/3rd/drive/api/v3/userinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  it('should throw an error if the response is not ok', async () => {
    (fetch as any).mockResponseOnce('Not Found', {status: 404});

    await expect(fetchUserInfo()).rejects.toThrow('请求失败：Not Found');
    expect(fetch).toHaveBeenCalledWith('https://365.kdocs.cn/3rd/drive/api/v3/userinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  it('should handle network errors', async () => {
    (fetch as any).mockReject(() => Promise.reject('Network error'));

    await expect(fetchUserInfo()).rejects.toThrow('Network error');
    expect(fetch).toHaveBeenCalledWith('https://365.kdocs.cn/3rd/drive/api/v3/userinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });
});
