import {processedTimeData} from '../../../assets/timeData';
import DropdownSelectDataType from '../../../assets/SelectDataType';
import type {TableColumnsType} from 'antd';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {Table} from 'antd';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {setFetchFilesParams} from '../../../slices/fetchFilesSlice';
interface TimeSelectComponentProps {
  checkedIcon: string;
  setSelectedTimesVisible: Dispatch<SetStateAction<boolean>>;
}
const getLastSevenDayTime = () => {
  const currentTime = new Date();
  const currentTimeStamp = Math.floor(currentTime.getTime() / 1000); // 秒级时间戳
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(23, 59, 59, 999);
  const sevenDaysAgoTimeStamp = Math.floor(sevenDaysAgo.getTime() / 1000);
  return {start_time: currentTimeStamp, end_time: sevenDaysAgoTimeStamp};
};

export const TimeSelect: React.FC<TimeSelectComponentProps> = ({checkedIcon, setSelectedTimesVisible}) => {
  const dispatch: AppDispatch = useDispatch();
  const [_, setSelectTimeData] = useState(processedTimeData);
  const [selectedTime, setSelectedTime] = useState('all');

  const updateSelectedTime = (name: string) => {
    setSelectedTime(() => {
      return name;
    });
  };

  useEffect(() => {
    switch (selectedTime) {
      case 'all':
        dispatch(setFetchFilesParams({start_time: undefined, end_time: undefined}));
        break;
      case 'lastSevenDay':
        dispatch(setFetchFilesParams(getLastSevenDayTime()));
        break;
    }
    setSelectTimeData((prev) => {
      const newSate = prev.map((item) => {
        if (selectedTime === item.name) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      });
      return newSate;
    });
  }, [selectedTime]);

  const columns: TableColumnsType<DropdownSelectDataType> = [
    {
      dataIndex: 'name',
      render: (_, record: DropdownSelectDataType) => {
        let res = `<i style="margin-left: 2em"></i> ${record.title}`;
        if (record.checked) {
          res = `${checkedIcon} <i style="margin-left: 1em"></i> ${record.title}`;
        }
        return <span dangerouslySetInnerHTML={{__html: res}} />;
      },
      onCell: (record: DropdownSelectDataType, index) => {
        return {
          onClick: () => {
            if (record.name === 'all' && record.checked) {
              return;
            }
            record.checked = !record.checked;
            updateSelectedTime(record.name);
            setSelectedTimesVisible(false);
          }
        };
      }
    }
  ];

  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={processedTimeData}
      pagination={false}
      showHeader={false}
    />
  );
};
