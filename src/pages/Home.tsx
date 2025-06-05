/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactLogo from '../assets/react.svg';
import ClassSelect from '../pages/ClassSelect';
import classData from '../data/classes.json';
import { useState } from 'react';
import LeftSideBlock from './LeftSideBlock';
import ContentBlock from './ContentBlock';
import type { Stats } from '../type/ClassModel';

export default function Home() {
  const [class1, setClass1] = useState('');
  const [class2, setClass2] = useState('');
  const [resetClass2, setResetClass2] = useState(false);

  const handleClass1Select = (value: string) => {
    setClass1(value);
    setResetClass2(prev => !prev);
    setClass2('');
  };

  const handleClass2Select = (value: string) => {
    setClass2(value);
  };

  const class1Options = classData.map(cls => ({
    jobId: cls.jobId,
    jobName: cls.jobName
  }));

  const class2Options = (() => {
    const selected = classData.find(cls => cls.jobName === class1);
    return selected?.subJobs || [];
  })();

  const selectedClass = classData.find(cls => cls.jobName === class1);
  const selectedStats: Stats | undefined = selectedClass?.stats;

  return (
    <div className="flex w-full h-dvh overflow-hidden text-white border border-amber-100">
        <div className="flex-1 p-3">
            <div className="flex items-center gap-1">
                <img src={ReactLogo} className="h-8" alt="WannaDev" />
                <p className="m-0">WannaDev</p>
                <div className="flex gap-2 ml-auto mr-auto">
                    <div>
                        <ClassSelect label='' onSelect={handleClass1Select} options={class1Options} />
                    </div>
                    <div className="pl-4 pr-4 border border-amber-50">
                        <p className="m-0">0/ 164</p>
                    </div>
                    <div>
                        <ClassSelect label='' onSelect={handleClass2Select} options={class2Options} disabled={!class1} resetTrigger={resetClass2} />
                    </div>
                    <div className="pl-4 pr-4 border border-amber-50">
                        <p className="m-0">0/ 164</p>
                    </div>
                </div>
            </div>
            <div>
                <ClassSelect label='' onSelect={handleClass2Select} options={class2Options} disabled={!class1} resetTrigger={resetClass2} />
            </div>
            {/* <div className="w-[330px] h-[90svh] border-4 border-white overflow-x-auto mt-2">
                <LeftSideBlock stats={selectedStats} />
            </div> */}
            <div className="flex h-[90svh] border-4 border-white mt-2 overflow-hidden">
                <div className="w-1/5 overflow-y-auto bg-gray-800">
                    <LeftSideBlock stats={selectedStats} />
                </div>

                <div className="w-4/5 overflow-y-auto bg-gray-900 p-2 text-sm">
                    <ContentBlock class1={class1} class2={class2} />
                </div>
            </div>
        </div>
    </div>
  );
}
