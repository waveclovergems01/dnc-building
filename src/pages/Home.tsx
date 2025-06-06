import ReactLogo from '../assets/react.svg';
import ClassSelect from '../pages/ClassSelect';
import classData from '../data/classes.json';
import { useEffect, useState } from 'react';
import LeftSideBlock from './LeftSideBlock';
import ContentBlock from './ContentBlock';
import type { Stats } from '../type/ClassModel';
import { setClass1, setClass2, subscribe, getClass1, getClass2 } from './Memory';

export default function Home() {
  const [class1State, setClass1State] = useState('');
  const [class2State, setClass2State] = useState('');
  const [resetClass2, setResetClass2] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribe(() => {
        setClass1State(getClass1());
        setClass2State(getClass2());
    });
    return unsubscribe;
    }, []);

  const handleClass1Select = (value: string) => {
    setClass1(value); // ✅ update Memory
    setClass1State(value); // (ใช้ใน component นี้เท่านั้น)
    setResetClass2(prev => !prev);
    setClass2(''); // ✅ clear class2 ใน Memory
    setClass2State('');
  };

  const handleClass2Select = (value: string) => {
    setClass2(value); // ✅ update Memory
    setClass2State(value);
  };

  const class1Options = classData.map(cls => ({
    jobId: cls.jobId,
    jobName: cls.jobName
  }));

  const class2Options = (() => {
    const selected = classData.find(cls => cls.jobName === class1State);
    return selected?.subJobs || [];
  })();

  const selectedClass = classData.find(cls => cls.jobName === class1State);
  const selectedStats: Stats | undefined = selectedClass?.stats;

  return (
    <div className="flex w-full h-dvh overflow-hidden text-white border border-amber-100">
        <div className="flex-1 p-3">
            <div className="flex items-center gap-1">
                <img src={ReactLogo} className="h-8" alt="WannaDev" />
                <p className="m-0">WannaDev</p>
                <div className="flex gap-2 ml-auto mr-auto">
                    <div>
                        <ClassSelect label="class1" onSelect={handleClass1Select} options={class1Options} />
                    </div>
                    <div className="pl-4 pr-4 border border-amber-50">
                        <p className="m-0">0/ 164</p>
                    </div>
                    <div>
                        <ClassSelect label="class2" onSelect={handleClass2Select} options={class2Options} disabled={!class1State} resetTrigger={resetClass2} />
                    </div>
                    <div className="pl-4 pr-4 border border-amber-50">
                        <p className="m-0">0/ 164</p>
                    </div>
                </div>
            </div>
            <div className="flex h-[90svh] border-4 border-white mt-2 overflow-hidden">
                <div className="w-1/5 overflow-y-auto bg-gray-800">
                    <LeftSideBlock stats={selectedStats} />
                </div>

                <div className="w-4/5 overflow-y-auto bg-gray-900 p-2 text-sm">
                    <ContentBlock class1={class1State} class2={class2State} />
                </div>
            </div>
        </div>
    </div>
  );
}
