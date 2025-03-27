import React, {useMemo, useState} from 'react';

// 计算属性

export const StateComputedDemo: React.FC = () => {
    const [count, setCount] = useState(1);
    const [multiplier, setMultiplier] = useState(2);

    // 使用 useMemo 计算派生值
    const computedValue = useMemo(() => {
        console.log('计算中...');
        return count * multiplier;
    }, [count, multiplier]);

    return (
        <div>
            <div>Count: {count}</div>
            <div>Multiplier: {multiplier}</div>
            <div>Computed Value: {computedValue}</div>
            <button onClick={() => setCount(prev => prev + 1)}>增加 Count</button>
            <button onClick={() => setMultiplier(prev => prev + 1)}>增加 Multiplier</button>
        </div>
    );
};

interface PropsComputedDemoProps {
    first: string;
    second: string;
}

export const PropsComputedDemo: React.FC<PropsComputedDemoProps> = (props) => {
    const {first, second} = props;
    // 当 first 或 second 改变时，combined 会重新计算
    const combined = useMemo(() => {
        return `${first} ${second}`;
    }, [first, second]);

    return (
        <div>
            <h2>Combined Value</h2>
            <p>{combined}</p>
        </div>
    );
};

// 使用单独函数配合 useMemo
// 计算并返回四个值
interface XDataProps {
    xdata: number[];
}

interface ProcessedData {
    sum: number;
    average: number;
    min: number;
    max: number;
}

// 单独函数处理 xdata，计算并返回四个值
function processXData(data: number[]): ProcessedData {
    if (data.length === 0) {
        return {sum: 0, average: 0, min: 0, max: 0};
    }
    const sum = data.reduce((acc, cur) => acc + cur, 0);
    const average = sum / data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    return {sum, average, min, max};
}

export const XDataComponent: React.FC<XDataProps> = ({xdata}) => {
    // 使用 useMemo 来缓存计算结果，只有当 xdata 改变时才重新计算
    const {sum, average, min, max} = useMemo(() => processXData(xdata), [xdata]);

    return (
        <div>
            <h2>处理后的数据</h2>
            <div>和：{sum}</div>
            <div>平均值：{average}</div>
            <div>最小值：{min}</div>
            <div>最大值：{max}</div>
        </div>
    );
};

// 自定义 Hook，根据传入的 xdata 返回处理后的结果
function useProcessXData(data: number[]): ProcessedData {
    return useMemo(() => processXData(data), [data]);
}

export const XDataComponentWithHook: React.FC<XDataProps> = ({xdata}) => {
    const {sum, average, min, max} = useProcessXData(xdata);

    return (
        <div>
            <h2>处理后的数据（自定义 Hook）</h2>
            <div>和：{sum}</div>
            <div>平均值：{average}</div>
            <div>最小值：{min}</div>
            <div>最大值：{max}</div>
        </div>
    );
};
