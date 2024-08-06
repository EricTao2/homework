import { processedTimeData } from '../../../assets/timeData';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import type { RadioChangeEvent } from 'antd';
import { DatePicker, Card, Radio, ConfigProvider, Space, Button } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import locale from 'antd/locale/zh_CN';
import styles from '../../../styles/ButtonInput.module.scss';
interface CustomedTimeComponentProps {
    checkedIcon: string;
    setSelectedTimesVisible: Dispatch<SetStateAction<boolean>>;
}

const { RangePicker } = DatePicker;
export const CustomedTime: React.FC<CustomedTimeComponentProps> = () =>
//({checkedIcon, setSelectedTimesVisible})
{
    const dispatch: AppDispatch = useDispatch();
    const [selectTargetTime, setSelectTargetTime] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setSelectTargetTime(e.target.value);
    };
    return (
        <ConfigProvider locale={locale}>
            <Card title="" bordered={false} style={{ width: "30vh" }}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Radio.Group onChange={onChange} value={selectTargetTime}>
                        <Radio value={1}>创建时间</Radio>
                        <Radio value={2}>更新时间</Radio>
                    </Radio.Group>
                    <RangePicker size="small" style={{width: "100%"}}/>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" 
                        >确定</Button>
                        </div>
            </Space>
        </Card>
        </ConfigProvider >
    );
};

export { processedTimeData };
