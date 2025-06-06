// src/components/Home.tsx
import React, { useState, useEffect } from 'react';
import ReactLogo from '../assets/react.svg';
import ClassSelect from '../pages/ClassSelect';
import classData from '../data/classes.json';
import LeftSideBlock from './LeftSideBlock';
import ContentBlock from './ContentBlock';
import type { Stats } from '../type/ClassModel';
import {
  setClass1,
  setClass2,
  setSkillLevel,
} from './Memory';
import { decompressFromEncodedURIComponent } from 'lz-string';

// ✅ ฟังก์ชัน decodeData (ย้ายมาจาก ImportExport.tsx)
function decodeData(encoded: string): {
  class1: string;
  class2: string;
  skills: Record<string, Record<string, number>>;
} | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    return JSON.parse(json || '{}');
  } catch {
    return null;
  }
}

export default function Home() {
  const [class1State, setClass1State] = useState('');
  const [class2State, setClass2State] = useState('');
  const [resetClass2, setResetClass2] = useState(false);

  // ✅ โหลดจาก URL (เช่น ?d=....)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('d');

    if (encoded) {
      const parsed = decodeData(encoded);
      if (parsed) {
        setClass1(parsed.class1 || '');
        setClass2(parsed.class2 || '');
        setClass1State(parsed.class1 || '');
        setClass2State(parsed.class2 || '');

        if (parsed.skills) {
          Object.entries(parsed.skills).forEach(([cls, skillMap]) => {
            Object.entries(skillMap).forEach(([id, level]) => {
              setSkillLevel(cls, id, level);
            });
          });
        }
      }
    }
  }, []);

  const handleClass1Select = (value: string) => {
    setClass1(value);
    setClass1State(value);
    setResetClass2((prev) => !prev);
    setClass2('');
    setClass2State('');
  };

  const handleClass2Select = (value: string) => {
    setClass2(value);
    setClass2State(value);
  };

  const class1Options = classData.map((cls) => ({
    jobId: cls.jobId,
    jobName: cls.jobName,
  }));

  const class2Options = (() => {
    const selected = classData.find((cls) => cls.jobName === class1State);
    return selected?.subJobs || [];
  })();

  const selectedClass = classData.find((cls) => cls.jobName === class1State);
  const selectedStats: Stats | undefined = selectedClass?.stats;

  return (
    <div className="flex w-full h-dvh overflow-hidden text-white border border-amber-100">
      <div className="flex-1 p-3">
        <div className="flex items-center gap-1">
          <img src={ReactLogo} className="h-8" alt="WannaDev" />
          <p className="m-0">WannaDev</p>
          <div className="flex gap-2 ml-auto mr-auto">
            <div>
              <ClassSelect
                label="class1"
                onSelect={handleClass1Select}
                options={class1Options}
              />
            </div>
            <div className="pl-4 pr-4 border border-amber-50">
              <p className="m-0">0/ 164</p>
            </div>
            <div>
              <ClassSelect
                label="class2"
                onSelect={handleClass2Select}
                options={class2Options}
                disabled={!class1State}
                resetTrigger={resetClass2}
              />
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
