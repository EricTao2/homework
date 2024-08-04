import {processedScopeData} from '../../../assets/scopeData';
import DropdownSelectDataType from '../../../types/SelectDataType';
import type {TableColumnsType} from 'antd';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {Table} from 'antd';
import React, {Dispatch, SetStateAction, useEffect, useState, useRef} from 'react';
import {setFetchFilesParams} from '../../../slices/fetchFilesSlice';
interface ScopeSelectComponentProps {
  checkedIcon: string;
  setSelectedScopeVisible: Dispatch<SetStateAction<boolean>>;
}

export const ScopeSelect: React.FC<ScopeSelectComponentProps> = ({checkedIcon, setSelectedScopeVisible}) => {
  const dispatch: AppDispatch = useDispatch();
  const [_, setSelectScopeData] = useState(processedScopeData);
  const [selectedScope, setSelectedScope] = useState('all');
  const prevSelectedScope = useRef('');


  const updateSelectedScope = (name: string) => {
    if (selectedScope === name) return;
    setSelectedScope(() => {
      return name;
    });
  };

  useEffect(() => {
    if (prevSelectedScope.current === '') {
      prevSelectedScope.current = selectedScope;
      return;
    }
    prevSelectedScope.current = selectedScope;
    let newState = {};
    setSelectScopeData((prev) => {
      const newSelectScopeData = prev.map((item) => {
        if (selectedScope === item.name) {
          item.checked = true;
          newState = item.getStateValue ? item.getStateValue() : {};
        } else {
          item.checked = false;
        }
        return item;
      });
      return newSelectScopeData;
    });
    dispatch(setFetchFilesParams(newState));
  }, [selectedScope]);

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
            record.checked = !record.checked;
            updateSelectedScope(record.name);
            setSelectedScopeVisible(false);
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
      dataSource={processedScopeData}
      pagination={false}
      showHeader={false}
    />
  );
};

export { processedScopeData };
