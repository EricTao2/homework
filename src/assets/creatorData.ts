import { fetchUserInfo } from '../services/userApi';
import DropdownSelectDataType from './SelectDataType';

const userInfo = await fetchUserInfo();
const creatorData: DropdownSelectDataType[] = [
  {
    name: 'all',
    icon: `<img data-v-6cecdf70="" src="//volcengine-kdocs-cache.wpscdn.cn/kdocs/cloud/search/avatar_all_v2.svg">`,
    title: '所有人',
    getStateValue: () => {
      return {filter_user_id: undefined};
    }
  },
  {
    name: 'otherCreated',
    icon: `<img data-v-6cecdf70="" src="//volcengine-kdocs-cache.wpscdn.cn/kdocs/cloud/search/avatar_others_v2.svg">`,
    title: '他人创建的',
    getStateValue: () => {
      return {filter_user_id: `-${userInfo.id}`};
    }
  },
  {
    name: 'iCreated',
    icon: `<img data-v-6cecdf70="" style="height:22px;border-radius:50%" src="${userInfo.avatar}">`,
    title: `${userInfo.name}（我）`,
    getStateValue: () => {
      return {filter_user_id: `${userInfo.id}`};
    }
  },
];
export const processedCreatorData = creatorData.map((item, index) => {
  item.key = index.toString();
  item.checked = false;
  if (item.name === 'all') {
    item.checked = true;
  }
  return item;
});
