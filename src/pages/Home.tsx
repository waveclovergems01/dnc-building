import ReactLogo from '../assets/react.svg';
import ClassSelect from '../pages/ClassSelect';
import classData from '../data/classes.json';
import { useState } from 'react';

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

  return (
    <div className="p-3 text-white">
      <div className="flex items-center gap-1">
        <img src={ReactLogo} className="h-8" alt="WannaDev" />
        <p className="m-0">WannaDev</p>
        <div className="flex gap-2 ml-auto mr-auto">
          <div>
            <ClassSelect onSelect={handleClass1Select} options={class1Options} />
          </div>
          <div className="pl-4 pr-4 border border-amber-50">
            <p className="m-0">0/ 164</p>
          </div>
          <div>
            <ClassSelect onSelect={handleClass2Select} options={class2Options} disabled={!class1} resetTrigger={resetClass2} />
          </div>
          <div className="pl-4 pr-4 border border-amber-50">
            <p className="m-0">0/ 164</p>
          </div>
        </div>
      </div>
    </div>
  );
}
