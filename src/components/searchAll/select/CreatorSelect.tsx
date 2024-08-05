import { processedCreatorData } from '../../../assets/creatorData';
import DropdownSelectDataType from '../../../types/SelectDataType';
import type { TableColumnsType } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { Table } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import { setFetchFilesParams } from '../../../slices/fetchFilesSlice';

interface CreatorSelectComponentProps {
  checkedIcon: string;
  setSelectedCreatorVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedCreatorText: Dispatch<SetStateAction<string>>;
}

export const CreatorSelect: React.FC<CreatorSelectComponentProps> = ({ checkedIcon, setSelectedCreatorVisible, setSelectedCreatorText }) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectCreatorData, setSelectCreatorData] = useState(processedCreatorData);
  const [selectedCreator, setSelectedCreator] = useState('all');
  const prevSelectedCreator = useRef('');

  const updateSelectedCreator = (name: string) => {
    if (selectedCreator === name) return;
    setSelectedCreator(() => {
      return name;
    });
  };

  useEffect(() => {
    if (prevSelectedCreator.current === '' || prevSelectedCreator.current === selectedCreator) {
      prevSelectedCreator.current = selectedCreator;
      return;
    }
    prevSelectedCreator.current = selectedCreator;
    setSelectCreatorData((prev) => {
      const newSelectCreatorData = prev.map((item) => {
        if (selectedCreator === item.name) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      });
      return newSelectCreatorData;
    });

    for (const item of selectCreatorData) {
      if (selectedCreator === item.name) {
        item.checked = true;
        const newState = item.getStateValue ? item.getStateValue() : {};
        dispatch(setFetchFilesParams(newState));
        break;
      }
    };
  }, [selectedCreator]);

  const columns: TableColumnsType<DropdownSelectDataType> = [
    {
      dataIndex: 'name',
      render: (_, record: DropdownSelectDataType) => {
        let res = `<div style="float: left; margin-left: 2em;margin-right: 1em">${record.icon}</div> ${record.title}`;
        if (record.checked) {
          res = `${checkedIcon} <div style="float: left; margin-left: 1em;margin-right: 1em">${record.icon}</div> <div style="float: left;">${record.title}</div>`;
        }
        return <span dangerouslySetInnerHTML={{ __html: res }} />;
      },
      onCell: (record: DropdownSelectDataType) => {
        return {
          onClick: () => {
            record.checked = !record.checked;
            updateSelectedCreator(record.name);
            setSelectedCreatorVisible(false);
          }
        };
      }
    }
  ];

  return (
    <Table
      style={{ cursor: 'pointer' }}
      className="custom-table"
      columns={columns}
      dataSource={processedCreatorData}
      pagination={false}
      showHeader={false}
    />
  );
};
