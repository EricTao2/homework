import DropdownSelectDataType from './SelectDataType';
const getCurrentTimeStamp = () => {
  const currentTime = new Date();
  return Math.floor(currentTime.getTime() / 1000); // 秒级时间戳
};
const timeData: DropdownSelectDataType[] = [
  {
    name: 'all',
    title: '不限时间',
    getStateValue: () => {
      const currentTimeStamp = getCurrentTimeStamp();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      const sevenDaysAgoTimeStamp = Math.floor(sevenDaysAgo.getTime() / 1000);
      return {start_time: sevenDaysAgoTimeStamp, end_time: currentTimeStamp};
    }
  },
  {
    name: 'lastSevenDay',
    title: '最近7天',
    getStateValue: () => {
      const currentTimeStamp = getCurrentTimeStamp();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      const sevenDaysAgoTimeStamp = Math.floor(sevenDaysAgo.getTime() / 1000);
      return {start_time: sevenDaysAgoTimeStamp, end_time: currentTimeStamp};
    }
  },
  {
    name: 'lastOneMonth',
    title: '最近1个月',
    getStateValue: () => {
      const currentTimeStamp = getCurrentTimeStamp();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      oneMonthAgo.setHours(0, 0, 0, 0);
      const oneMonthAgoTimeStamp = Math.floor(oneMonthAgo.getTime() / 1000);
      return {start_time: oneMonthAgoTimeStamp, end_time: currentTimeStamp};
    }
  },
  {
    name: 'lastTwoMonth',
    title: '最近2个月',
    getStateValue: () => {
      const currentTimeStamp = getCurrentTimeStamp();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      twoMonthsAgo.setHours(0, 0, 0, 0);
      const twoMonthsAgoTimeStamp = Math.floor(twoMonthsAgo.getTime() / 1000);
      return {start_time: twoMonthsAgoTimeStamp, end_time: currentTimeStamp};
    }
  },
  {
    name: 'lastThreeMonth',
    title: '最近3个月',
    getStateValue: () => {
      const currentTimeStamp = getCurrentTimeStamp();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      threeMonthsAgo.setHours(0, 0, 0, 0);
      const threeMonthsAgoTimeStamp = Math.floor(threeMonthsAgo.getTime() / 1000);
      return {start_time: threeMonthsAgoTimeStamp, end_time: currentTimeStamp};
    }
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
