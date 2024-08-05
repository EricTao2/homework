import { processedTimeData } from '../../../assets/timeData';
import DropdownSelectDataType from '../../../types/SelectDataType';
import type { TableColumnsType } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { ConfigProvider, Table } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import { DatePicker, Card } from 'antd';
import locale from 'antd/locale/zh_CN';
interface CustomedTimeComponentProps {
    checkedIcon: string;
    setSelectedTimesVisible: Dispatch<SetStateAction<boolean>>;
}

const { RangePicker } = DatePicker;
export const CustomedTime: React.FC<CustomedTimeComponentProps> = ({ checkedIcon, setSelectedTimesVisible }) => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <ConfigProvider locale={locale}>
            <Card title="" bordered={false} style={{ width: 300 }}>
                <RangePicker size="small" />
            </Card>
        </ConfigProvider>
    );
};

export { processedTimeData };
