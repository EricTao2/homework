import {processedFileTypeData, fileTypeMapping} from '../../../assets/fileTypeData';
import DropdownSelectDataType from '../../../types/SelectDataType';
import type {TableColumnsType} from 'antd';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {Table} from 'antd';
import React, {useEffect, useState, useRef} from 'react';
import {setFetchFilesParams} from '../../../slices/fetchFilesSlice';
interface FileTypeSelectComponentProps {
  checkedIcon: string;
}

function areSetsEqual<T>(setA: Set<T>, setB: Set<T>): boolean {
  if (setA.size !== setB.size) {
    return false;
  }

  for (let elem of setA) {
    if (!setB.has(elem)) {
      return false;
    }
  }

  return true;
}

export const FileTypeSelect: React.FC<FileTypeSelectComponentProps> = ({checkedIcon}) => {
  const dispatch: AppDispatch = useDispatch();
  const [_, setSelectFileTypeData] = useState(processedFileTypeData);
  const initSelectedTypes = new Set(['all']);
  const [selectedTypes, setSelectedTypes] = useState(initSelectedTypes);
  const prevSelectedTypes = useRef(new Set());

  const updateSelectTypes = (type: string, checked: boolean) => {
    setSelectedTypes((prev) => {
      let newState = new Set(prev);
      if (checked) {
        if (type === 'all') {
          newState = initSelectedTypes;
        } else {
          newState.add(type);
        }
      } else {
        newState.delete(type);
      }
      if (newState.size === 0) {
        newState = initSelectedTypes;
      }
      if (newState.size > 1) {
        newState.delete('all');
      }
      return newState;
    });
  };

  useEffect(() => {
    if (prevSelectedTypes.current.size == 0 || areSetsEqual(prevSelectedTypes.current, selectedTypes)) {
      prevSelectedTypes.current = selectedTypes;
      return;
    }
    prevSelectedTypes.current = selectedTypes;
    if (selectedTypes.has('all')) {
      dispatch(setFetchFilesParams({include_ext_groups: undefined, include_exts: undefined}));
    } else {
      fileTypeMapping;
      const include_ext_groups: string = Array.from(selectedTypes).join(',');
      const include_exts: string = Array.from(selectedTypes)
        .map((key) => fileTypeMapping.get(key) ?? []) // 取出对应的属性值（数组）
        .flat()
        .join(',');
      dispatch(setFetchFilesParams({include_ext_groups: include_ext_groups, include_exts: include_exts}));
    }
    setSelectFileTypeData((prev) => {
      const newSelectFileTypeData = prev.map((item) => {
        if (selectedTypes.has(item.name)) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      });
      return newSelectFileTypeData;
    });
  }, [selectedTypes]);

  const columns: TableColumnsType<DropdownSelectDataType> = [
    {
      title: '文件类型(可多选)',
      dataIndex: 'name',
      render: (_, record: DropdownSelectDataType) => {
        let res = `<div style="float: left; margin-left: 2em;margin-right: 0.5em">${record.icon}</div> ${record.title}`;
        if (record.checked) {
          res = `${checkedIcon} <div style="float: left; margin-left: 1em;margin-right: 0.5em">${record.icon}</div> ${record.title}`;
        }
        return <span dangerouslySetInnerHTML={{__html: res}} />;
      },
      onCell: (record: DropdownSelectDataType, _index) => {
        return {
          onClick: () => {
            if (record.name === 'all' && record.checked) {
              return;
            }
            record.checked = !record.checked;
            updateSelectTypes(record.name, record.checked);
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
      dataSource={processedFileTypeData}
      pagination={false}
      showHeader={true}
    />
  );
};
