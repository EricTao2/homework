import DropdownSelectDataType from './SelectDataType';

const timeData: DropdownSelectDataType[] = [
  {
    name: 'all',
    title: '不限时间'
  },
  {
    name: 'lastSevenDay',
    title: '最近7天'
  },
  {
    name: 'lastOneMonth',
    title: '最近1个月'
  },
  {
    name: 'lastTwoMonth',
    title: '最近2个月'
  },
  {
    name: 'lastThreeMonth',
    title: '最近3个月'
  },
  {
    name: 'customedTime',
    title: '自定义时间'
  }
];
export const processedTimeData = timeData.map((item, index) => {
  item.key = index.toString();
  item.checked = false;
  if (item.name === 'all') {
    item.checked = true;
  }
  return item;
});