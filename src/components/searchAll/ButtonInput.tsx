import {useEffect, useState} from 'react';
import {Button, Dropdown, Radio, Table} from 'antd';
import '../../styles/ButtonInput.module.scss';
import type {TableColumnsType, TableProps} from 'antd';
import {FileTypeSelect} from './select/FileTypeSelect';
import {TimeSelect} from './select/TimeSelect';

type TableRowSelection<T> = TableProps<T>['rowSelection'];
const checkedIcon = `<svg style="float: left" width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke-width="1.5">
               <g id="group-0" stroke="currentColor" fill="currentColor">
                 <path d="M2.5 7.38775L6.68824 11.2933C6.81053 11.401 6.99639 11.3913 7.10689 11.2716L13.4215 4.5" stroke-linecap="round" stroke-linejoin="miter" fill="none" vector-effect="non-scaling-stroke"></path>
               </g>
             </svg>`;

const ButtonInput = () => {
  const [position, setPosition] = useState('search_file_content');
  const [selectedTypesVisible, setSelectedTypesVisible] = useState(false);
  const [selectedCreatorsVisible, setSelectedCreatorsVisible] = useState(false);
  const [selectedTimesVisible, setSelectedTimesVisible] = useState(false);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} size="small">
            <Radio.Button value="search_file_content">文件名</Radio.Button>
            <Radio.Button value="search_file_name">正文</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <Dropdown
            trigger={['click']}
            open={selectedTypesVisible}
            onOpenChange={setSelectedTypesVisible}
            placement="bottomLeft"
            dropdownRender={() => <FileTypeSelect checkedIcon={checkedIcon} />}
          >
            <Button size="small">类型</Button>
          </Dropdown>
          <Dropdown
            trigger={['click']}
            open={selectedCreatorsVisible}
            onOpenChange={() => setSelectedCreatorsVisible(true)}
            placement="bottom"
            dropdownRender={() => (
              <Table
                rowSelection={rowSelection}
                columns={columns}
                // dataSource={data}
                pagination={false}
                showHeader={false}
              />
            )}
          >
            <Button size="small">创建者</Button>
          </Dropdown>
          <Dropdown
            trigger={['click']}
            open={selectedTimesVisible}
            onOpenChange={setSelectedTimesVisible}
            placement="bottomLeft"
            dropdownRender={() => (
              <TimeSelect checkedIcon={checkedIcon} setSelectedTimesVisible={setSelectedTimesVisible} />
            )}
          >
            <Button size="small">时间</Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ButtonInput;
