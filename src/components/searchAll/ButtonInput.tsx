import {useState} from 'react';
import {Button, Dropdown, Radio, Select, Table, Tag} from 'antd';
import '../../styles/ButtonInput.module.scss';
import type {TableColumnsType, TableProps} from 'antd';
import {processedData} from '../../assets/fileTypeData';

type TableRowSelection<T> = TableProps<T>['rowSelection'];
interface DataType {
  key: string;
  name: string;
}
const columns: TableColumnsType<DataType> = [
  {
    title: '文件类型(可多选)',
    dataIndex: 'name',
    render: (text: string) => <span dangerouslySetInnerHTML={{__html: text}} />
  }
];

const ButtonInput = () => {
  const [position, setPosition] = useState('');
  const [selectedTypesVisible, setSelectedTypesVisible] = useState(false);
  const [selectedCreatorsVisible, setSelectedCreatorsVisible] = useState(false);
  const [selectedTimesVisible, setSelectedTimesVisible] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    hideSelectAll: true,
    onChange: onSelectChange
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} size="small">
            <Radio.Button value="start">文件名</Radio.Button>
            <Radio.Button value="end">正文</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <Dropdown
            trigger={['click']}
            open={selectedTypesVisible}
            onOpenChange={setSelectedTypesVisible}
            placement="bottomLeft"
            dropdownRender={() => (
              <Table
                className="custom-table"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={processedData}
                pagination={false}
                showHeader={true}
              />
            )}
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
            onOpenChange={() => setSelectedTimesVisible(true)}
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
            <Button size="small">时间</Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ButtonInput;
