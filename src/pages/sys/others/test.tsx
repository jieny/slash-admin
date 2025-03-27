import Card from "@/components/card";
import {PropsComputedDemo, StateComputedDemo, XDataComponent} from "@/pages/sys/others/ComputedDemo.tsx";
import {useState} from "react";

// 生成指定长度的随机字符串
function generateRandomString(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 添加一个页面
// src/pages/sys/others/test.tsx
// src/router/routes/modules/others.tsx
// src/locales/lang/en_US/sys.json
// src/locales/lang/zh_CN/sys.json
// src/_mock/assets.js

export default function TestPage() {
    const [first, setFirst] = useState('Hello');
    const [second, setSecond] = useState('World');
    const [xdata, setXdata] = useState<number[]>([10, 20, 30, 40]);

    return (
        <div>
            Test
            <Card/>
            <StateComputedDemo/>


            <div>
                <h1>使用 useMemo 合二为一示例</h1>
                <PropsComputedDemo first={first} second={second}/>
                <div style={{marginTop: '20px'}}>
                    <button onClick={() => setFirst(generateRandomString())}>修改 First</button>
                    <button onClick={() => setSecond(generateRandomString())}>修改 Second</button>
                </div>
            </div>

            <div>
                <h1>XData 处理示例</h1>
                <XDataComponent xdata={xdata}/>
                {/* <XDataComponentWithHook xdata={xdata} /> */}
                <button onClick={() => setXdata([...xdata, Math.floor(1 + Math.random() * 100)])}>
                    添加随机数据
                </button>
            </div>
        </div>
    );
}
