/* eslint-disable @typescript-eslint/no-explicit-any */
import {FetchFilesParams} from '../types/fileSearchType';

export function fetchFiles(selectParams: FetchFilesParams): Promise<any> {
  const defaultParams = {
    order: 'DESC',
    time_range_field: 'mtime',
    search_operator_name: true,
    include_device_info: true,
    search_group_info: true,
    platform: 'browser',
    terminal: 'win',
    product: 'kdocs',
    request_id: 'kdocs_pcweb-1716157589687466_1',
    include_group: true,
    with_sharefolder_type: true,
    with_link: true,
    group_sources: 'yundoc,kmwiki'
  };

  let newSelectParams = {};
  Object.entries(selectParams).forEach(([key, value]) => {
    if (value !== undefined) {
      newSelectParams = {...newSelectParams, [key]: value};
    }
  });

  // 合并默认参数和动态参数
  const params = {...defaultParams, ...newSelectParams};
  const queryString = new URLSearchParams(params as any).toString(); // 需要将 params 转换为 string
  const url = `https://365.kdocs.cn/3rd/drive/api/v6/search/files?${queryString}`;

  const headers = {
    accept: '*/*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'x-kso-app-name': 'web_wpsdocs',
    'x-kso-platform-type': 'windows'
  };
  console.log('FetchFilesParams API');
  return fetch(url, {
    headers: headers,
    referrer: 'https://365.kdocs.cn/latest',
    referrerPolicy: 'unsafe-url',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
}
