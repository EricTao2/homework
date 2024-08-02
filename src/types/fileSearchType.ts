/* eslint-disable @typescript-eslint/no-explicit-any */
// 定义请求参数的接口
export interface FetchFilesParams {
  offset: number;
  count: number;
  sort_by: string; // 根据时间搜索
  start_time?: number;
  end_time?: number;
  include_exts?: string; //根据文件类型搜索
  include_ext_groups?: string;
  searchname?: string; //根据输入框搜索
  filter_user_id?: number; //根据创建人搜索
  scope?: number; //根据文件位置搜索
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
