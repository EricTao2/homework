import {processedTimeData} from '../../../assets/timeData';
import DropdownSelectDataType from '../../../types/SelectDataType';
import type {TableColumnsType} from 'antd';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {Table} from 'antd';
import React, {Dispatch, SetStateAction, useEffect, useState, useRef} from 'react';
import {setFetchFilesParams} from '../../../slices/fetchFilesSlice';
interface TimeSelectComponentProps {
  checkedIcon: string;
  setSelectedTimesVisible: Dispatch<SetStateAction<boolean>>;
  setCustomedTimeVisible: Dispatch<SetStateAction<boolean>>;
}

export const TimeSelect: React.FC<TimeSelectComponentProps> = ({
  checkedIcon,
  setSelectedTimesVisible,
  setCustomedTimeVisible
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectTimeData, setSelectTimeData] = useState(processedTimeData);
  const [selectedTime, setSelectedTime] = useState('all');
  const prevSelectedTime = useRef('');

  const updateSelectedTime = (name: string) => {
    if (selectedTime === name) return;
    setSelectedTime(() => {
      return name;
    });
  };

  useEffect(() => {
    if (prevSelectedTime.current === '' || prevSelectedTime.current === selectedTime) {
      prevSelectedTime.current = selectedTime;
      return;
    }
    if (selectedTime === 'customedTime') {
      setCustomedTimeVisible(true);
    }
    prevSelectedTime.current = selectedTime;
    setSelectTimeData((prev) => {
      const newSelectTimeData = prev.map((item) => {
        if (selectedTime === item.name) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      });
      return newSelectTimeData;
    });
    for (const item of selectTimeData) {
      if (selectedTime === item.name) {
        item.checked = true;
        const newState = item.getStateValue ? item.getStateValue() : {};
        dispatch(setFetchFilesParams(newState));
        break;
      }
    }
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
      onCell: (record: DropdownSelectDataType) => {
        return {
          onClick: () => {
            record.checked = !record.checked;
            updateSelectedTime(record.name);
          }
        };
      }
    }
  ];

  return (
    <Table
      style={{cursor: 'pointer'}}
      className="custom-table"
      columns={columns}
      dataSource={processedTimeData}
      pagination={false}
      showHeader={false}
    />
  );
};

export {processedTimeData};
