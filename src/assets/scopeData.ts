import DropdownSelectDataType from './SelectDataType';

const scopeData: DropdownSelectDataType[] = [
  {
    name: 'all',
    title: '全部位置',
    getStateValue: () => {
      return {scope: undefined};
    }
  },
  {
    name: 'recent',
    title: '最近',
    getStateValue: () => {
      return {scope: 3};
    }
  },
  {
    name: 'myReceied',
    title: '我收到的文档',
    getStateValue: () => {
      return {scope: 2};
    }
  },
  {
    name: 'mySended',
    title: '我发出的文档',
    getStateValue: () => {
      return {scope: 1};
    }
  },
  {
    name: 'myClound',
    title: '我的云文档',
    getStateValue: () => {
      return {scope: 4};
    }
  },
  {
    name: 'team',
    title: '团队文档',
    getStateValue: () => {
      return {scope: 5};
    }
  },
  {
    name: 'customedScope',
    title: '自定义位置'
  },
];
export const processedScopeData = scopeData.map((item, index) => {
  item.key = index.toString();
  item.checked = false;
  if (item.name === 'all') {
    item.checked = true;
  }
  return item;
});