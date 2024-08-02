/* eslint-disable @typescript-eslint/no-explicit-any */
// 定义请求参数的接口
interface FetchFilesParams {
  offset: number;
  count: number;
  sort_by: string;
  start_time?: number; // 根据时间搜索
  end_time?: number;
  include_exts?: string;
  include_ext_groups?: string;
  searchname?: string;
  filter_user_id?: number;
}

// 定义返回数据的接口
interface File {
  path: string;
  new_path: string;
  id: number;
  corpid: number;
  company_name: string;
  groupid: number;
  fname: string;
  fsize: number;
  ftype: string;
  group_source: string;
  ctime: number;
  mtime: number;
  uvtime: number;
  fver: number;
  user_permission: string;
  link_id: string;
  link_url: string;
  creator: {
    id: number;
    name: string;
    avatar: string;
    corpid: number;
  };
  modifier: {
    id: number;
    name: string;
    avatar: string;
    corpid: number;
  };
  link: {
    creator: {
      id: number;
      name: string;
      avatar: string;
      corpid: number;
    };
    sid: string;
    fileid: number;
    userid: number;
    ctime: number;
    groupid: number;
    status: string;
    ranges: string;
    permission: string;
  };
  device_info: Record<string, any>;
  extra: {
    _edit_counts?: string;
    _mtime: string;
    _open?: string;
    _open_counts?: string;
    es_recall: string;
    open?: string;
    pop_group?: string;
    total: string;
    doc_mtime?: string;
  };
}

export function fetchFiles(selectParams: FetchFilesParams) {
  const defaultParams = {
    order: 'DESC',
    time_range_field: 'mtime',
    search_operator_name: true,
    include_device_info: true,
    search_group_info: true,
    platform: 'browser',
    terminal: 'win',
    product: 'kdocs',
    search_file_content: false,
    search_file_name: true,
    request_id: 'kdocs_pcweb-1716157589687466_1',
    include_group: true,
    with_sharefolder_type: true,
    with_link: true,
    group_sources: 'yundoc,kmwiki'
  };

  // 合并默认参数和动态参数
  const params = {...defaultParams, ...selectParams};
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

  fetch(url, {
    headers: headers,
    referrer: 'https://365.kdocs.cn/latest',
    referrerPolicy: 'unsafe-url',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  })
    .then((response) => response.json())
    .then((data) => console.log(12, data))
    .catch((error) => console.error('Error:', error));
}

// 使用示例
export const selectParams: FetchFilesParams = {
  offset: 0,
  count: 20,
  sort_by: 'mtime',
  start_time: 1717257600,
  end_time: 1722614399,
  include_exts: 'otl',
  include_ext_groups: 'otl',
  searchname: '',
  filter_user_id: -1606716157
};

fetchFiles(selectParams);
