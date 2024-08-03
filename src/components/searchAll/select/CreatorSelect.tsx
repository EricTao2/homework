import {processedCreatorData} from '../../../assets/creatorData';
import DropdownSelectDataType from '../../../assets/SelectDataType';
import type {TableColumnsType} from 'antd';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {Table} from 'antd';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {setFetchFilesParams} from '../../../slices/fetchFilesSlice';

interface CreatorSelectComponentProps {
  checkedIcon: string;
  setSelectedCreatorVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreatorSelect: React.FC<CreatorSelectComponentProps> = ({checkedIcon, setSelectedCreatorVisible}) => {
  const dispatch: AppDispatch = useDispatch();
  const [_, setSelectCreatorData] = useState(processedCreatorData);
  const [selectedCreator, setSelectedCreator] = useState('all');

  const updateSelectedCreator = (name: string) => {
    if (selectedCreator === name) return;
    setSelectedCreator(() => {
      return name;
    });
  };

  useEffect(() => {
    setSelectCreatorData((prev) => {
      const newSate = prev.map((item) => {
        if (selectedCreator === item.name) {
          item.checked = true;
          dispatch(setFetchFilesParams(item.getStateValue ? item.getStateValue() : {}));
        } else {
          item.checked = false;
        }
        return item;
      });
      return newSate;
    });
  }, [selectedCreator]);

  const columns: TableColumnsType<DropdownSelectDataType> = [
    {
      dataIndex: 'name',
      render: (_, record: DropdownSelectDataType) => {
        let res = `<div style="float: left; margin-left: 2em;margin-right: 1em">${record.icon}</div> ${record.title}`;
        if (record.checked) {
          res = `${checkedIcon} <div style="float: left; margin-left: 1em;margin-right: 1em">${record.icon}</div> <div style="float: left;">${record.title}</div>`;
        }
        return <span dangerouslySetInnerHTML={{__html: res}} />;
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
      style={{cursor: 'pointer'}}
      className="custom-table"
      columns={columns}
      dataSource={processedCreatorData}
      pagination={false}
      showHeader={false}
    />
  );
};
