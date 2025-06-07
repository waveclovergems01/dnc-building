// src/components/ContentBlock.tsx
import { useState } from 'react';
import SkillTree from './SkillTree';
import Equipment from './Equipment';
import ImportExport from './ImportExport';
import { resetSkillLevels } from './Memory';

interface Props {
  class1: string;
  class2: string;
}

function SkillNotFoundPanel({ className }: { className: string }) {
  return (
    <div className="w-full bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 bg-opacity-60 border border-blue-500 text-center py-6 px-4 rounded-lg shadow-md mt-4 backdrop-blur-sm">
      <p className="text-lg font-bold text-blue-200 drop-shadow">ยังไม่มีข้อมูลสกิลของคลาส</p>
      <p className="text-xl font-semibold text-cyan-300 mt-1 drop-shadow">{className}</p>
    </div>
  );
}

const supportedClasses = ['Cleric', 'Warrior', 'Sword Master'];

export default function ContentBlock({ class1, class2 }: Props) {
  const [activeTab, setActiveTab] = useState<'skilltree' | 'equipment' | 'importexport'>('skilltree');
  const [innerTab, setInnerTab] = useState<'class1' | 'class2'>('class1');
  const [resetKeyClass1, setResetKeyClass1] = useState(0);
  const [resetKeyClass2, setResetKeyClass2] = useState(0);

  const handleReset = () => {
    if (innerTab === 'class1') {
      resetSkillLevels(class1);
      setResetKeyClass1((prev) => prev + 1);
    }
    if (innerTab === 'class2') {
      resetSkillLevels(class2);
      setResetKeyClass2((prev) => prev + 1);
    }
  };

  const renderSkillContent = (cls: string, resetKey: number) => {
    if (supportedClasses.includes(cls)) {
      return (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-amber-200 mb-2 text-lg font-semibold">
              Skill Tree {cls}
            </p>
            <button
              onClick={handleReset}
              className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded shadow"
            >
              Reset Skill
            </button>
          </div>
          <SkillTree resetKey={resetKey} className={cls} />
        </div>
      );
    }

    return <SkillNotFoundPanel className={cls} />;
  };

  return (
    <div className="w-full h-full text-white">
      {/* Tabs */}
      <div className="flex border-b border-amber-200">
        <button
          className={`px-4 py-2 text-sm font-bold ${
            activeTab === 'skilltree'
              ? 'border-b-2 border-yellow-300 text-yellow-300'
              : 'text-gray-300'
          }`}
          onClick={() => setActiveTab('skilltree')}
        >
          Skill Tree
        </button>

        <button
          className={`px-4 py-2 text-sm font-bold ${
            activeTab === 'equipment'
              ? 'border-b-2 border-yellow-300 text-yellow-300'
              : 'text-gray-300'
          }`}
          onClick={() => setActiveTab('equipment')}
        >
          Equipment
        </button>

        <button
          className={`px-4 py-2 text-sm font-bold ${
            activeTab === 'importexport'
              ? 'border-b-2 border-yellow-300 text-yellow-300'
              : 'text-gray-300'
          }`}
          onClick={() => setActiveTab('importexport')}
        >
          Import/Export
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {activeTab === 'skilltree' && (
          <div className="grid grid-cols-[10%_40%_auto] gap-4">
            <div className="flex flex-col space-y-2">
              {class1 && (
                <button
                  className={`px-2 py-1 text-left rounded text-sm ${
                    innerTab === 'class1'
                      ? 'bg-yellow-500 text-black font-bold'
                      : 'bg-gray-600 text-white'
                  }`}
                  onClick={() => setInnerTab('class1')}
                >
                  {class1}
                </button>
              )}
              {class2 && (
                <button
                  className={`px-2 py-1 text-left rounded text-sm ${
                    innerTab === 'class2'
                      ? 'bg-yellow-500 text-black font-bold'
                      : 'bg-gray-600 text-white'
                  }`}
                  onClick={() => setInnerTab('class2')}
                >
                  {class2}
                </button>
              )}
            </div>

            <div className="col-span-1">
              {innerTab === 'class1' && class1 && renderSkillContent(class1, resetKeyClass1)}
              {innerTab === 'class2' && class2 && renderSkillContent(class2, resetKeyClass2)}
            </div>

            <div className="col-span-1">
              {/* Future block space */}
            </div>
          </div>
        )}
        {activeTab === 'equipment' && <Equipment />}
        {activeTab === 'importexport' && <ImportExport />}
      </div>
    </div>
  );
}
